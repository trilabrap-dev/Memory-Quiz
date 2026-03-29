import React from 'react';
import { useGame } from '../store/GameContext';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const { gameState, dispatch } = useGame();

  const handleManualScore = (teamId: string, points: number) => {
    dispatch({ type: 'MANUAL_SCORE', teamId, points });
  };

  return (
    <motion.footer 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-28 bg-slate-800/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center px-4 gap-4 z-10 shrink-0"
    >
      {gameState.teams.map((team, idx) => {
        const isCurrent = idx === gameState.teamIdx;
        return (
          <motion.div
            key={team.id}
            animate={{ 
              scale: isCurrent ? 1.05 : 1,
              opacity: isCurrent ? 1 : 0.8,
              boxShadow: isCurrent ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none'
            }}
            className={`flex items-center justify-between p-4 rounded-2xl w-full max-w-sm transition-all duration-300 ${
              isCurrent ? 'ring-4 ring-white z-10' : ''
            }`}
            style={{ backgroundColor: team.color }}
          >
            <div className="flex flex-col text-white">
              <span className="text-lg font-bold opacity-90">{team.name}</span>
              <span className="text-4xl font-black tracking-tight">{team.score}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleManualScore(team.id, 5)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                title="+5 điểm"
              >
                <Plus size={20} />
              </button>
              <button
                onClick={() => handleManualScore(team.id, -5)}
                className="w-10 h-10 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white transition-colors"
                title="-5 điểm"
              >
                <Minus size={20} />
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.footer>
  );
};

export default Footer;
