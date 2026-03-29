export type Team = {
  id: string;
  name: string;
  color: string;
  score: number;
};

export type QuestionType = 'mcq' | 'tf' | 'text';

export type Question = {
  id: string;
  text: string;
  round: 1 | 2 | 3;
  type: QuestionType;
  options?: string[]; // For mcq
  answer: string;
};

export type CardType = 'normal' | 'bomb' | 'jackpot';

export type Card = {
  id: string;
  pairId: string;
  emoji: string;
  name: string;
  type: CardType;
  isFlipped: boolean;
  isMatched: boolean;
};

export type WheelItemType = 'points' | 'none' | 'challenge' | 'give' | 'music';

export type WheelItem = {
  id: string;
  name: string;
  type: WheelItemType;
  value: number;
  color: string;
  weight: number;
};

export type MusicChallenge = {
  id: string;
  audioUrl: string;
  answer: string;
};

export type GamePhase =
  | 'START_TURN'
  | 'SHOW_QUESTION'
  | 'WAITING_ANSWER'
  | 'CORRECT'
  | 'WRONG'
  | 'SKIP'
  | 'FLIP_PHASE'
  | 'REWARD_WHEEL'
  | 'PENALTY_WHEEL'
  | 'CHALLENGE_MODAL'
  | 'MUSIC_MODAL'
  | 'GIVE_MODAL'
  | 'ROUND_TRANSITION'
  | 'END_TURN'
  | 'GAME_OVER';

export type GameConfig = {
  teams: Team[];
  questions: Question[];
  rewardWheel: WheelItem[];
  penaltyWheel: WheelItem[];
  musicChallenges: MusicChallenge[];
};

export type GameState = {
  teams: Team[];
  teamIdx: number;
  round: 1 | 2 | 3;
  questionIdx: number;
  phase: GamePhase;
  cards: Card[];
  flippedCards: Card[];
  matchedCards: Card[];
  toast: { message: string; type: 'success' | 'error' | 'info' | 'warning' } | null;
  currentWheelResult: WheelItem | null;
  isRewardChallenge: boolean;
  usedMusicIds: string[];
};
