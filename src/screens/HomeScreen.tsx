import React from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, BookOpen, Settings } from 'lucide-react';
import { useGame } from '../store/GameContext';
import { ScreenType } from '../App';

type Props = {
  onNavigate: (screen: ScreenType) => void;
};

const HomeScreen: React.FC<Props> = ({ onNavigate }) => {
  const { config, dispatch } = useGame();

  const handleNewGame = () => {
    dispatch({ type: 'START_GAME', config });
    onNavigate('GAME');
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-4xl p-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 drop-shadow-sm">
          Memory Quiz Showdown
        </h1>
        <p className="text-2xl text-slate-600 font-medium">Ôn tập Quản trị học — Chương 6</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button
          onClick={handleNewGame}
          className="col-span-1 md:col-span-2 py-6 px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl text-3xl font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-4"
        >
          <Play size={40} fill="currentColor" />
          CHƠI MỚI
        </button>

        <button
          onClick={() => onNavigate('GAME')}
          className="py-4 px-6 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xl font-semibold shadow-md border border-slate-200 flex items-center justify-center gap-3 transition-colors"
        >
          <RotateCcw size={24} />
          Tiếp tục
        </button>

        <button
          onClick={() => onNavigate('RULES')}
          className="py-4 px-6 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xl font-semibold shadow-md border border-slate-200 flex items-center justify-center gap-3 transition-colors"
        >
          <BookOpen size={24} />
          Luật chơi
        </button>

        <button
          onClick={() => onNavigate('SETUP')}
          className="col-span-1 md:col-span-2 py-4 px-6 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xl font-semibold shadow-md flex items-center justify-center gap-3 transition-colors"
        >
          <Settings size={24} />
          Cài đặt (MC)
        </button>
      </div>

      <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-200/50 w-full max-w-2xl text-center">
        <div className="flex justify-center gap-8 mb-4">
          {config.teams.map((team) => (
            <div key={team.id} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: team.color }} />
              <span className="text-xl font-semibold text-slate-700">{team.name}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-500 font-medium">
          {config.questions.length} câu hỏi • 3 vòng • {config.teams.length} đội
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
