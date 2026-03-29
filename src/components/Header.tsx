import React from 'react';
import { Home } from 'lucide-react';
import { useGame } from '../store/GameContext';
import { ScreenType } from '../App';
import { motion } from 'motion/react';

type Props = {
  onNavigate: (screen: ScreenType) => void;
};

const Header: React.FC<Props> = ({ onNavigate }) => {
  const { gameState } = useGame();
  const currentTeam = gameState.teams[gameState.teamIdx];

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 flex items-center justify-between px-6 z-10 shrink-0"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => onNavigate('HOME')}
          className="p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
        >
          <Home size={28} />
        </button>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Vòng {gameState.round}</span>
          <span className="text-xl font-bold text-slate-800">Câu {gameState.questionIdx + 1}/30</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-slate-500 font-medium text-lg">Đang chơi:</span>
        <motion.div
          key={currentTeam?.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-6 py-2 rounded-full text-white font-bold text-xl shadow-sm"
          style={{ backgroundColor: currentTeam?.color || '#000' }}
        >
          {currentTeam?.name || 'Loading...'}
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
