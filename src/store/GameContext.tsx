import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { generateCards, initialConfig } from '../data';
import { Card, GameConfig, GamePhase, GameState, Team, WheelItem } from '../types';

type GameAction =
  | { type: 'START_GAME'; config: GameConfig }
  | { type: 'LOAD_GAME'; state: GameState }
  | { type: 'SET_PHASE'; phase: GamePhase }
  | { type: 'SET_TOAST'; message: string; toastType: 'success' | 'error' | 'info' | 'warning' }
  | { type: 'CLEAR_TOAST' }
  | { type: 'ADD_SCORE'; teamIdx: number; points: number }
  | { type: 'NEXT_TURN'; totalQuestions: number }
  | { type: 'FLIP_CARD'; cardId: string; round: number }
  | { type: 'MATCH_CARDS'; cardIds: string[]; points: number }
  | { type: 'UNMATCH_CARDS'; cardIds: string[] }
  | { type: 'SET_WHEEL_RESULT'; result: WheelItem; isReward: boolean }
  | { type: 'UPDATE_TEAM_SCORE'; teamId: string; points: number }
  | { type: 'MANUAL_SCORE'; teamId: string; points: number }
  | { type: 'MARK_MUSIC_USED'; musicId: string };

const initialGameState: GameState = {
  teams: [],
  teamIdx: 0,
  round: 1,
  questionIdx: 0,
  phase: 'START_TURN',
  cards: [],
  flippedCards: [],
  matchedCards: [],
  toast: null,
  currentWheelResult: null,
  isRewardChallenge: false,
  usedMusicIds: [],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialGameState,
        teams: action.config.teams.map(t => ({ ...t, score: 0 })),
        cards: generateCards(),
      };
    case 'LOAD_GAME':
      return action.state;
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'SET_TOAST':
      return { ...state, toast: { message: action.message, type: action.toastType } };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    case 'ADD_SCORE': {
      const newTeams = [...state.teams];
      newTeams[action.teamIdx].score += action.points;
      return { ...state, teams: newTeams };
    }
    case 'UPDATE_TEAM_SCORE': {
      const newTeams = state.teams.map(t => t.id === action.teamId ? { ...t, score: t.score + action.points } : t);
      return { ...state, teams: newTeams };
    }
    case 'MANUAL_SCORE': {
      const newTeams = state.teams.map(t => t.id === action.teamId ? { ...t, score: t.score + action.points } : t);
      return { ...state, teams: newTeams };
    }
    case 'NEXT_TURN': {
      const nextQIdx = state.questionIdx + 1;
      if (nextQIdx >= action.totalQuestions) {
        return { ...state, phase: 'GAME_OVER' };
      }
      
      const currentRound = state.round;
      let nextRound = currentRound;
      // Determine round based on question index (1-10 -> R1, 11-20 -> R2, 21-30 -> R3)
      if (nextQIdx < 10) nextRound = 1;
      else if (nextQIdx < 20) nextRound = 2;
      else nextRound = 3;

      const nextTeamIdx = (state.teamIdx + 1) % state.teams.length;

      if (nextRound > currentRound) {
        return {
          ...state,
          questionIdx: nextQIdx,
          teamIdx: nextTeamIdx,
          round: nextRound,
          phase: 'ROUND_TRANSITION',
          flippedCards: [], // Clear flipped cards for new turn
        };
      }

      return {
        ...state,
        questionIdx: nextQIdx,
        teamIdx: nextTeamIdx,
        phase: 'START_TURN',
        flippedCards: [],
      };
    }
    case 'FLIP_CARD': {
      const card = state.cards.find(c => c.id === action.cardId);
      if (!card || card.isFlipped || card.isMatched) return state;

      const newCards = state.cards.map(c => c.id === action.cardId ? { ...c, isFlipped: true } : c);
      const newFlipped = [...state.flippedCards, { ...card, isFlipped: true }];

      return { ...state, cards: newCards, flippedCards: newFlipped };
    }
    case 'MATCH_CARDS': {
      const newCards = state.cards.map(c => action.cardIds.includes(c.id) ? { ...c, isMatched: true } : c);
      const newTeams = [...state.teams];
      newTeams[state.teamIdx].score += action.points;
      return {
        ...state,
        cards: newCards,
        teams: newTeams,
        matchedCards: [...state.matchedCards, ...state.cards.filter(c => action.cardIds.includes(c.id))],
        flippedCards: [], // Clear flipped after match
      };
    }
    case 'UNMATCH_CARDS': {
      // Cards stay flipped, but we clear the flippedCards array so they aren't part of the active pair
      return { ...state, flippedCards: [] };
    }
    case 'SET_WHEEL_RESULT':
      return { ...state, currentWheelResult: action.result, isRewardChallenge: action.isReward };
    case 'MARK_MUSIC_USED':
      return { ...state, usedMusicIds: [...state.usedMusicIds, action.musicId] };
    default:
      return state;
  }
}

type GameContextType = {
  config: GameConfig;
  setConfig: (config: GameConfig) => void;
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<GameConfig>(() => {
    const saved = localStorage.getItem('mqshow_config');
    return saved ? JSON.parse(saved) : initialConfig;
  });

  const [gameState, dispatch] = useReducer(gameReducer, initialGameState, (initial) => {
    const saved = localStorage.getItem('mqshow_game');
    return saved ? JSON.parse(saved) : initial;
  });

  const setConfig = (newConfig: GameConfig) => {
    setConfigState(newConfig);
    localStorage.setItem('mqshow_config', JSON.stringify(newConfig));
  };

  useEffect(() => {
    localStorage.setItem('mqshow_game', JSON.stringify(gameState));
  }, [gameState]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    dispatch({ type: 'SET_TOAST', message, toastType: type });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_TOAST' });
    }, 2000);
  };

  return (
    <GameContext.Provider value={{ config, setConfig, gameState, dispatch, showToast }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
