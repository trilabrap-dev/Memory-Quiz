import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../store/GameContext';
import { Check, X, SkipForward, Music } from 'lucide-react';

const Modals: React.FC = () => {
  const { config, gameState, dispatch } = useGame();
  const { phase, isRewardChallenge } = gameState;

  const handleClose = () => {
    dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
  };

  const handleChallengeResult = (isCorrect: boolean) => {
    const points = gameState.currentWheelResult?.value || 15;
    if (isRewardChallenge) {
      if (isCorrect) {
        dispatch({ type: 'ADD_SCORE', teamIdx: gameState.teamIdx, points: Math.abs(points) });
      }
    } else {
      if (!isCorrect) {
        dispatch({ type: 'ADD_SCORE', teamIdx: gameState.teamIdx, points: -Math.abs(points) });
      }
    }
    handleClose();
  };

  const getUnusedMusic = () => {
    const available = config.musicChallenges.filter(m => !gameState.usedMusicIds?.includes(m.id));
    if (available.length === 0) {
      // If all used, just pick from all and maybe we should clear used but let's just pick random
      return config.musicChallenges[Math.floor(Math.random() * config.musicChallenges.length)];
    }
    return available[Math.floor(Math.random() * available.length)];
  };

  // Select music once when modal opens
  const [selectedMusic] = useState(getUnusedMusic());

  const handleMusicResult = (isCorrect: boolean) => {
    const points = gameState.currentWheelResult?.value || 10;
    if (!isCorrect) {
      dispatch({ type: 'ADD_SCORE', teamIdx: gameState.teamIdx, points: -Math.abs(points) });
    }
    if (selectedMusic) {
      dispatch({ type: 'MARK_MUSIC_USED', musicId: selectedMusic.id });
    }
    handleClose();
  };

  const handleMusicSkip = () => {
    if (selectedMusic) {
      dispatch({ type: 'MARK_MUSIC_USED', musicId: selectedMusic.id });
    }
    handleClose();
  };

  const handleGivePoints = (targetTeamId: string) => {
    const points = gameState.currentWheelResult?.value || 15;
    dispatch({ type: 'UPDATE_TEAM_SCORE', teamId: targetTeamId, points: Math.abs(points) });
    handleClose();
  };

  return (
    <AnimatePresence>
      {phase === 'MUSIC_MODAL' && (
        <ModalOverlay>
          <MusicModal
            music={selectedMusic}
            onResult={handleMusicResult}
            onSkip={handleMusicSkip}
          />
        </ModalOverlay>
      )}

      {phase === 'GIVE_MODAL' && (
        <ModalOverlay>
          <GiveModal
            teams={gameState.teams.filter((_, idx) => idx !== gameState.teamIdx)}
            onSelect={handleGivePoints}
          />
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

const ModalOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
  >
    {children}
  </motion.div>
);

const MusicModal = ({ music, onResult, onSkip }: any) => {
  const [showAnswer, setShowAnswer] = useState(false);
  
  return (
  <motion.div
    initial={{ scale: 0.9, y: 50 }}
    animate={{ scale: 1, y: 0 }}
    exit={{ scale: 0.9, y: 50 }}
    className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center space-y-8"
  >
    <h2 className="text-4xl font-bold uppercase text-pink-500 flex items-center justify-center gap-4">
      <Music size={40} /> Đoán nhạc
    </h2>
    
    {music?.audioUrl ? (
      <audio controls src={music.audioUrl} className="w-full mt-4" />
    ) : (
      <div className="bg-pink-50 text-pink-600 p-4 rounded-xl font-semibold border border-pink-200">
        MC tự phát nhạc từ thiết bị
      </div>
    )}

    <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
      <span className="text-sm font-bold text-slate-400 uppercase mb-2">Đáp án MC:</span>
      {!showAnswer ? (
        <button 
          onClick={() => setShowAnswer(true)}
          className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold transition-colors"
        >
          Khui đáp án
        </button>
      ) : (
        <p className="text-3xl font-bold text-slate-700 mt-1 animate-pulse">{music?.answer}</p>
      )}
    </div>
    <div className="flex gap-4 justify-center pt-4">
      <button onClick={() => onResult(true)} className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl text-2xl font-bold flex items-center justify-center gap-2">
        <Check size={28} /> ĐÚNG
      </button>
      <button onClick={() => onResult(false)} className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl text-2xl font-bold flex items-center justify-center gap-2">
        <X size={28} /> SAI
      </button>
      <button onClick={onSkip} className="px-6 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xl font-bold flex items-center justify-center gap-2">
        <SkipForward size={24} /> Bỏ qua
      </button>
    </div>
  </motion.div>
  );
};

const GiveModal = ({ teams, onSelect }: any) => {
  // If only 1 other team, auto select? The prompt says "Tặng điểm đội khác + chỉ 2 đội → auto chọn đội còn lại"
  // We can handle that here or in the parent. Let's handle it here with a quick effect.
  React.useEffect(() => {
    if (teams.length === 1) {
      setTimeout(() => onSelect(teams[0].id), 1500);
    }
  }, [teams, onSelect]);

  return (
    <motion.div
      initial={{ scale: 0.9, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 50 }}
      className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl w-full text-center space-y-8"
    >
      <h2 className="text-4xl font-bold uppercase text-amber-500">Tặng điểm</h2>
      <p className="text-2xl text-slate-600">Chọn đội để tặng điểm:</p>
      
      {teams.length === 1 ? (
        <div className="text-3xl font-bold text-green-600 animate-pulse">
          Đang tự động tặng cho {teams[0].name}...
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {teams.map((team: any) => (
            <button
              key={team.id}
              onClick={() => onSelect(team.id)}
              className="py-6 px-8 rounded-2xl text-3xl font-bold text-white shadow-md hover:scale-105 transition-transform"
              style={{ backgroundColor: team.color }}
            >
              {team.name}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Modals;
