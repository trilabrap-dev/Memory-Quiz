import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../store/GameContext';
import { Clock, SkipForward } from 'lucide-react';

const ShowQuestionPhase: React.FC = () => {
  const { config, gameState, dispatch } = useGame();
  const question = config.questions[gameState.questionIdx];

  const handleStartTimer = () => {
    dispatch({ type: 'SET_PHASE', phase: 'WAITING_ANSWER' });
  };

  const handleSkip = () => {
    dispatch({ type: 'SET_PHASE', phase: 'SKIP' });
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-full max-w-7xl p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-10"
    >
      <div className="flex items-center gap-4">
        <span className="px-6 py-2 bg-blue-100 text-blue-800 font-bold rounded-full text-xl uppercase tracking-wider">
          {question.type === 'mcq' ? 'Trắc nghiệm' : question.type === 'tf' ? 'Đúng/Sai' : 'Tự luận'}
        </span>
        <span className="px-6 py-2 bg-slate-100 text-slate-600 font-bold rounded-full text-xl uppercase tracking-wider">
          Vòng {question.round}
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
        {question.text}
      </h2>

      {question.type === 'mcq' && question.options && (
        <motion.div 
          className="grid grid-cols-2 gap-4 w-full mt-8"
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
            <motion.div 
              key={idx} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xl md:text-2xl font-semibold text-slate-700"
            >
              {String.fromCharCode(65 + idx)}. {opt}
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex gap-4 mt-8 w-full justify-center">
        <button
          onClick={handleStartTimer}
          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl text-2xl font-bold flex items-center gap-3 shadow-lg transition-transform hover:scale-105"
        >
          <Clock size={32} />
          Bắt đầu tính giờ
        </button>
        <button
          onClick={handleSkip}
          className="px-6 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl text-xl font-bold flex items-center gap-2 transition-colors"
        >
          <SkipForward size={24} />
          Bỏ qua
        </button>
      </div>
    </motion.div>
  );
};

export default ShowQuestionPhase;
