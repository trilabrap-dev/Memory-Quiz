import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../store/GameContext';
import { ScreenType } from '../App';
import { Home, Trophy, Medal } from 'lucide-react';

type Props = {
  onNavigate: (screen: ScreenType) => void;
};

const GameOverScreen: React.FC<Props> = ({ onNavigate }) => {
  const { gameState } = useGame();
  
  // Sort teams by score descending
  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative p-8">
      {/* Confetti effect could go here, but we'll use simple CSS animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-yellow-400/50"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              opacity: 1
            }}
            animate={{
              y: window.innerHeight + 50,
              x: `calc(${Math.random() * window.innerWidth}px + ${Math.random() * 200 - 100}px)`,
              rotate: Math.random() * 360
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center z-10 mb-16"
      >
        <Trophy size={80} className="mx-auto text-yellow-400 mb-6 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]" />
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-lg">
          KẾT QUẢ CHUNG CUỘC
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row items-end justify-center gap-8 z-10 w-full max-w-6xl h-96">
        {/* 2nd Place */}
        {sortedTeams[1] && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center w-1/3"
          >
            <div className="text-3xl font-bold mb-4 text-slate-300 flex items-center gap-2">
              <Medal className="text-slate-400" /> Hạng 2
            </div>
            <div
              className="w-full rounded-t-3xl flex flex-col items-center justify-end pb-8 shadow-2xl"
              style={{ backgroundColor: sortedTeams[1].color, height: '200px' }}
            >
              <span className="text-4xl font-black text-white/90 mb-2">{sortedTeams[1].name}</span>
              <span className="text-6xl font-black text-white">{sortedTeams[1].score}</span>
            </div>
          </motion.div>
        )}

        {/* 1st Place */}
        {sortedTeams[0] && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center w-1/3 z-20"
          >
            <div className="text-4xl font-bold mb-4 text-yellow-400 flex items-center gap-2 animate-pulse">
              <Trophy className="text-yellow-400" /> QUÁN QUÂN
            </div>
            <div
              className="w-full rounded-t-3xl flex flex-col items-center justify-end pb-12 shadow-[0_0_50px_rgba(250,204,21,0.3)] border-4 border-yellow-400"
              style={{ backgroundColor: sortedTeams[0].color, height: '280px' }}
            >
              <span className="text-5xl font-black text-white/90 mb-2">{sortedTeams[0].name}</span>
              <span className="text-8xl font-black text-white drop-shadow-md">{sortedTeams[0].score}</span>
            </div>
          </motion.div>
        )}

        {/* 3rd Place */}
        {sortedTeams[2] && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center w-1/3"
          >
            <div className="text-2xl font-bold mb-4 text-amber-600 flex items-center gap-2">
              <Medal className="text-amber-700" /> Hạng 3
            </div>
            <div
              className="w-full rounded-t-3xl flex flex-col items-center justify-end pb-6 shadow-2xl"
              style={{ backgroundColor: sortedTeams[2].color, height: '160px' }}
            >
              <span className="text-3xl font-black text-white/90 mb-2">{sortedTeams[2].name}</span>
              <span className="text-5xl font-black text-white">{sortedTeams[2].score}</span>
            </div>
          </motion.div>
        )}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => onNavigate('HOME')}
        className="mt-16 px-10 py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-2xl font-bold flex items-center gap-4 backdrop-blur-sm transition-colors border border-white/20 z-10"
      >
        <Home size={32} />
        Về trang chủ
      </motion.button>
    </div>
  );
};

export default GameOverScreen;
