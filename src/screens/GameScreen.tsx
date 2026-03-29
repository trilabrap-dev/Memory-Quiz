import React, { useEffect, useState, useRef } from 'react';
import { useGame } from '../store/GameContext';
import { ScreenType } from '../App';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import StartTurnPhase from '../components/phases/StartTurnPhase';
import ShowQuestionPhase from '../components/phases/ShowQuestionPhase';
import WaitingAnswerPhase from '../components/phases/WaitingAnswerPhase';
import ResultPhase from '../components/phases/ResultPhase';
import FlipPhase from '../components/phases/FlipPhase';
import WheelPhase from '../components/phases/WheelPhase';
import Modals from '../components/Modals';
import RoundTransition from '../components/phases/RoundTransition';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';

type Props = {
  onNavigate: (screen: ScreenType) => void;
};

const GameScreen: React.FC<Props> = ({ onNavigate }) => {
  const { gameState } = useGame();
  
  // Persistent Timer State
  const [timerDuration, setTimerDuration] = useState(15);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState.phase === 'GAME_OVER') {
      onNavigate('GAME_OVER');
    }
  }, [gameState.phase, onNavigate]);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(timerDuration);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    setTimerDuration(val);
    setTimeLeft(val);
    setIsTimerRunning(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden relative">
      <Header onNavigate={onNavigate} />
      
      {/* Persistent Floating Timer */}
      <div className="absolute top-24 right-6 z-40 flex flex-col items-end gap-2">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 flex flex-col items-center min-w-[160px]">
          <div className="flex items-center justify-between w-full mb-2">
            <button 
              onClick={() => setShowTimerSettings(!showTimerSettings)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Clock size={20} />
            </button>
            <span className="text-xs font-bold text-slate-400 uppercase">Đồng hồ</span>
          </div>
          
          <div className={`text-5xl font-black tabular-nums transition-colors ${timeLeft <= 5 && timeLeft > 0 && isTimerRunning ? 'text-red-500 animate-pulse' : timeLeft === 0 ? 'text-red-600' : 'text-slate-800'}`}>
            {timeLeft}
          </div>
          
          <div className="flex gap-2 mt-4 w-full">
            <button 
              onClick={toggleTimer}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center text-white transition-colors ${isTimerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isTimerRunning ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={resetTimer}
              className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg flex items-center justify-center text-slate-700 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>

        {/* Timer Settings Dropdown */}
        {showTimerSettings && (
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-full animate-in fade-in slide-in-from-top-2">
            <label className="block text-sm font-bold text-slate-600 mb-2">Cài đặt thời gian (giây):</label>
            <input 
              type="number" 
              value={timerDuration}
              onChange={handleDurationChange}
              className="w-full p-2 border border-slate-300 rounded-lg text-lg font-semibold text-center focus:ring-2 focus:ring-blue-500 outline-none"
              min="1"
            />
          </div>
        )}
      </div>

      <main className="flex-1 overflow-hidden relative flex items-center justify-center p-4">
        {gameState.phase === 'ROUND_TRANSITION' && <RoundTransition />}
        {gameState.phase === 'START_TURN' && <StartTurnPhase />}
        {gameState.phase === 'SHOW_QUESTION' && <ShowQuestionPhase />}
        {gameState.phase === 'WAITING_ANSWER' && <WaitingAnswerPhase />}
        {(gameState.phase === 'CORRECT' || gameState.phase === 'WRONG' || gameState.phase === 'SKIP') && <ResultPhase />}
        {gameState.phase === 'FLIP_PHASE' && <FlipPhase />}
        {gameState.phase === 'REWARD_WHEEL' && <WheelPhase type="reward" />}
        {gameState.phase === 'PENALTY_WHEEL' && <WheelPhase type="penalty" />}
      </main>

      <Footer />
      <Toast />
      <Modals />
    </div>
  );
};

export default GameScreen;
