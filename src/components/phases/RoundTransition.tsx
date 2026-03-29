import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../store/GameContext';

const RoundTransition: React.FC = () => {
  const { gameState, dispatch } = useGame();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_PHASE', phase: 'START_TURN' });
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const roundNames = ['Khởi động', 'Tăng tốc', 'Sinh tử'];
  const roundColors = ['bg-blue-600', 'bg-orange-600', 'bg-red-600'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${roundColors[gameState.round - 1]} text-white`}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="text-8xl font-black uppercase tracking-widest mb-4 drop-shadow-2xl"
      >
        VÒNG {gameState.round}
      </motion.h1>
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring' }}
        className="text-6xl font-bold text-white/90 uppercase tracking-wider drop-shadow-xl"
      >
        {roundNames[gameState.round - 1]}
      </motion.h2>
    </motion.div>
  );
};

export default RoundTransition;
