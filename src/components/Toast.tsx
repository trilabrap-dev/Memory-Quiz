import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../store/GameContext';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

const Toast: React.FC = () => {
  const { gameState } = useGame();
  const { toast } = gameState;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-50"
        >
          <div className={`flex items-center gap-3 px-8 py-4 rounded-2xl shadow-2xl text-white font-bold text-2xl
            ${toast.type === 'success' ? 'bg-green-500' : 
              toast.type === 'error' ? 'bg-red-500' : 
              toast.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}
          `}>
            {toast.type === 'success' && <CheckCircle size={32} />}
            {toast.type === 'error' && <AlertTriangle size={32} />}
            {toast.type === 'warning' && <AlertTriangle size={32} />}
            {toast.type === 'info' && <Info size={32} />}
            {toast.message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
