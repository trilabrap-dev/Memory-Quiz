import React, { useState, useRef, useEffect } from 'react';
import { GameProvider, useGame } from './store/GameContext';
import HomeScreen from './screens/HomeScreen';
import RulesScreen from './screens/RulesScreen';
import SetupScreen from './screens/SetupScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import BackgroundAnimation from './components/BackgroundAnimation';
import { AnimatePresence, motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

export type ScreenType = 'HOME' | 'RULES' | 'SETUP' | 'GAME' | 'GAME_OVER';

const GlobalAudioPlayer = () => {
  const { config } = useGame();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && config.bgMusicUrl) {
      audioRef.current.volume = 0.3; // Set background music volume lower
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, config.bgMusicUrl]);

  if (!config.bgMusicUrl) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={config.bgMusicUrl} loop />
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors text-slate-700"
        title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('HOME');

  const navigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative z-0 overflow-hidden">
      <BackgroundAnimation />
      <GlobalAudioPlayer />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full flex items-center justify-center"
        >
          {currentScreen === 'HOME' && <HomeScreen onNavigate={navigate} />}
          {currentScreen === 'RULES' && <RulesScreen onNavigate={navigate} />}
          {currentScreen === 'SETUP' && <SetupScreen onNavigate={navigate} />}
          {currentScreen === 'GAME' && <GameScreen onNavigate={navigate} />}
          {currentScreen === 'GAME_OVER' && <GameOverScreen onNavigate={navigate} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
