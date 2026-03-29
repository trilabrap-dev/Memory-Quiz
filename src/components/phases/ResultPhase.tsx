import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../store/GameContext';
import { CheckCircle, XCircle, SkipForward, ArrowRight, Dices, AlertTriangle } from 'lucide-react';

const ResultPhase: React.FC = () => {
  const { config, gameState, dispatch, showToast } = useGame();
  const question = config.questions[gameState.questionIdx];
  const phase = gameState.phase;

  useEffect(() => {
    if (phase === 'CORRECT') {
      showToast('CHÍNH XÁC! +5 điểm', 'success');
    } else if (phase === 'WRONG') {
      showToast('SAI RỒI!', 'error');
    }
  }, [phase, showToast]);

  const handleNext = () => {
    if (phase === 'CORRECT') {
      // Check if there are unflipped cards
      const unflipped = gameState.cards.filter(c => !c.isFlipped && !c.isMatched);
      if (unflipped.length > 0) {
        dispatch({ type: 'SET_PHASE', phase: 'FLIP_PHASE' });
      } else {
        dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
      }
    } else if (phase === 'WRONG') {
      dispatch({ type: 'SET_PHASE', phase: 'PENALTY_WHEEL' });
    } else {
      dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full h-full max-w-7xl p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-10"
    >
      {phase === 'CORRECT' && (
        <div className="flex flex-col items-center text-green-500">
          <CheckCircle size={100} className="mb-6" />
          <h2 className="text-6xl font-black uppercase tracking-wider">Chính xác!</h2>
        </div>
      )}
      {phase === 'WRONG' && (
        <div className="flex flex-col items-center text-red-500">
          <XCircle size={100} className="mb-6" />
          <h2 className="text-6xl font-black uppercase tracking-wider">Sai rồi!</h2>
        </div>
      )}
      {phase === 'SKIP' && (
        <div className="flex flex-col items-center text-slate-500">
          <SkipForward size={100} className="mb-6" />
          <h2 className="text-6xl font-black uppercase tracking-wider">Bỏ qua</h2>
        </div>
      )}

      <div className="w-full bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 mt-8">
        <h3 className="text-2xl font-bold text-slate-500 uppercase tracking-widest mb-4">Đáp án đúng</h3>
        <p className="text-4xl font-bold text-slate-800">{question.answer}</p>
      </div>

      <div className="mt-12 w-full flex justify-center">
        {phase === 'CORRECT' ? (
          <button
            onClick={handleNext}
            className="px-12 py-6 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl text-4xl font-bold flex items-center gap-4 shadow-xl transition-transform hover:scale-105"
          >
            <Dices size={48} />
            LẬT THẺ!
          </button>
        ) : phase === 'WRONG' ? (
          <button
            onClick={handleNext}
            className="px-12 py-6 bg-red-500 hover:bg-red-600 text-white rounded-2xl text-4xl font-bold flex items-center gap-4 shadow-xl transition-transform hover:scale-105"
          >
            <AlertTriangle size={48} />
            VÒNG QUAY HÌNH PHẠT
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-10 py-5 bg-slate-800 hover:bg-slate-900 text-white rounded-2xl text-3xl font-bold flex items-center gap-4 shadow-xl transition-transform hover:scale-105"
          >
            Câu tiếp
            <ArrowRight size={36} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ResultPhase;
