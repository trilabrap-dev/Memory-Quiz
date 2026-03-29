import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../store/GameContext';
import { Play } from 'lucide-react';

const StartTurnPhase: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const currentTeam = gameState.teams[gameState.teamIdx];

  const handleStart = () => {
    dispatch({ type: 'SET_PHASE', phase: 'SHOW_QUESTION' });
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-12"
    >
      <h2 className="text-5xl font-bold text-slate-500 uppercase tracking-widest">Lượt của</h2>
      <div
        className="text-8xl font-black text-white px-16 py-8 rounded-3xl shadow-2xl"
        style={{ backgroundColor: currentTeam.color }}
      >
        {currentTeam.name}
      </div>
      <button
        onClick={handleStart}
        className="mt-12 px-10 py-5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-3xl font-bold flex items-center gap-4 shadow-xl transition-transform hover:scale-105"
      >
        <Play size={40} fill="currentColor" />
        Hiện câu hỏi
      </button>
    </motion.div>
  );
};

export default StartTurnPhase;
