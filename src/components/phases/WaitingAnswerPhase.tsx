import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../store/GameContext';
import { Check, X, SkipForward } from 'lucide-react';

const WaitingAnswerPhase: React.FC = () => {
  const { config, gameState, dispatch } = useGame();
  const question = config.questions[gameState.questionIdx];

  const handleCorrect = () => {
    dispatch({ type: 'ADD_SCORE', teamIdx: gameState.teamIdx, points: 5 });
    dispatch({ type: 'SET_PHASE', phase: 'CORRECT' });
  };

  const handleWrong = () => {
    dispatch({ type: 'SET_PHASE', phase: 'WRONG' });
  };

  const handleSkip = () => {
    dispatch({ type: 'SET_PHASE', phase: 'SKIP' });
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full h-full max-w-7xl p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-10 relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center w-full">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-8">
          {question.text}
        </h2>

        {question.type === 'mcq' && question.options && (
          <motion.div 
            className="grid grid-cols-2 gap-4 w-full mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {question.options.map((opt, idx) => (
              <motion.button
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                onClick={() => opt === question.answer ? handleCorrect() : handleWrong()}
                className="p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-2xl text-xl md:text-2xl font-semibold text-slate-700 transition-colors"
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* MC Controls for non-MCQ or manual override */}
        <div className="flex gap-4 w-full justify-center p-4 bg-slate-100 rounded-2xl border border-slate-200 mt-4 relative">
          <button
            onClick={handleCorrect}
            className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xl font-bold flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-105"
          >
            <Check size={24} />
            ĐÚNG
          </button>
          <button
            onClick={handleWrong}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xl font-bold flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-105"
          >
            <X size={24} />
            SAI
          </button>
          <button
            onClick={handleSkip}
            className="px-6 py-3 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-xl text-lg font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <SkipForward size={20} />
            Bỏ qua
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WaitingAnswerPhase;
