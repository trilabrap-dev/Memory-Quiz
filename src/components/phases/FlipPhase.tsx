import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../store/GameContext';
import { Card } from '../../types';
import { SkipForward, CheckCircle } from 'lucide-react';

const FlipPhase: React.FC = () => {
  const { config, gameState, dispatch, showToast } = useGame();
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [specialEffect, setSpecialEffect] = useState<'jackpot' | 'bomb' | null>(null);

  // We only care about cards flipped *this turn* for the primary match logic
  // But the prompt says: "Nếu 2 thẻ KHÔNG khớp → kiểm tra xem có thẻ nào khớp với các thẻ ĐÃ LẬT TRƯỚC ĐÓ (đang ngửa nhưng chưa matched) không"
  
  const handleCardClick = (card: Card) => {
    if (card.isFlipped || card.isMatched || selectedCards.length >= 2) return;
    
    dispatch({ type: 'FLIP_CARD', cardId: card.id, round: gameState.round });
    setSelectedCards(prev => [...prev, card]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [card1, card2] = selectedCards;
      
      setTimeout(() => {
        if (card1.pairId === card2.pairId) {
          // Direct match
          handleMatch(card1.type, [card1.id, card2.id]);
        } else {
          // Check against previously flipped cards (that are not matched)
          const previouslyFlipped = gameState.cards.filter(c => c.isFlipped && !c.isMatched && c.id !== card1.id && c.id !== card2.id);
          
          const matchForCard1 = previouslyFlipped.find(c => c.pairId === card1.pairId);
          const matchForCard2 = previouslyFlipped.find(c => c.pairId === card2.pairId);

          if (matchForCard1 && matchForCard2) {
            // Both matched different previous cards!
            handleMatch(card1.type, [card1.id, matchForCard1.id], false);
            setTimeout(() => {
              handleMatch(card2.type, [card2.id, matchForCard2.id], true);
            }, 2000);
          } else if (matchForCard1) {
            handleMatch(card1.type, [card1.id, matchForCard1.id], true);
          } else if (matchForCard2) {
            handleMatch(card2.type, [card2.id, matchForCard2.id], true);
          } else {
            // No match at all
            showToast('Chưa khớp!', 'warning');
            dispatch({ type: 'UNMATCH_CARDS', cardIds: [card1.id, card2.id] });
            setTimeout(() => {
              dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
            }, 1500);
          }
        }
      }, 1000);
    }
  }, [selectedCards]);

  const handleMatch = (type: string, matchedIds: string[], proceedToNext: boolean = true) => {
    let points = 0;
    
    if (type === 'jackpot') {
      points = 60;
      showToast('🎰 NỔ HỦ! +60 điểm', 'success');
      setSpecialEffect('jackpot');
      dispatch({ type: 'MATCH_CARDS', cardIds: matchedIds, points });
      if (proceedToNext) {
        setTimeout(() => {
          setSpecialEffect(null);
          dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
        }, 3000);
      } else {
        setTimeout(() => setSpecialEffect(null), 2000);
      }
    } else if (type === 'bomb') {
      points = -30;
      showToast('💣 BOM! -30 điểm', 'error');
      setSpecialEffect('bomb');
      dispatch({ type: 'MATCH_CARDS', cardIds: matchedIds, points });
      if (proceedToNext) {
        setTimeout(() => {
          setSpecialEffect(null);
          dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
        }, 3000);
      } else {
        setTimeout(() => setSpecialEffect(null), 2000);
      }
    } else {
      // Normal
      points = gameState.round * 10;
      showToast(`Thẻ thường! +${points} điểm`, 'success');
      dispatch({ type: 'MATCH_CARDS', cardIds: matchedIds, points });
      if (proceedToNext) {
        setTimeout(() => dispatch({ type: 'SET_PHASE', phase: 'REWARD_WHEEL' }), 1500);
      }
    }
  };

  const handleSkip = () => {
    dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col items-center justify-center p-4 space-y-6"
    >
      <div className="flex justify-between items-center w-full max-w-[85vw]">
        <h2 className="text-4xl font-bold text-slate-800">Lật 2 thẻ</h2>
        <button
          onClick={handleSkip}
          className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xl font-bold flex items-center gap-2 transition-colors"
        >
          <SkipForward size={24} />
          Bỏ qua lật thẻ
        </button>
      </div>

      <div className="grid grid-cols-6 gap-2 md:gap-3 w-full max-w-4xl">
        {gameState.cards.map((card, index) => {
          const isFlipped = card.isFlipped || card.isMatched;
          return (
            <motion.div
              key={card.id}
              className={`relative w-full aspect-[3/4] cursor-pointer perspective-1000`}
              onClick={() => handleCardClick(card)}
              whileHover={!isFlipped ? { scale: 1.05 } : {}}
              whileTap={!isFlipped ? { scale: 0.95 } : {}}
              animate={{ 
                opacity: card.isMatched ? 0 : 1,
                scale: card.isMatched ? 0.5 : 1
              }}
              transition={{ 
                opacity: { delay: 1.5, duration: 0.5 },
                scale: { delay: 1.5, duration: 0.5 }
              }}
            >
              <motion.div
                className="w-full h-full relative preserve-3d transition-transform duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
              >
                {/* Front (Face Down) */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md border-2 border-blue-400 flex items-center justify-center">
                  <span className="text-4xl text-white font-black">{index + 1}</span>
                </div>
                
                {/* Back (Face Up) */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-md border-2 flex flex-col items-center justify-center p-2
                  ${card.isMatched ? 'bg-green-100 border-green-400' : 'bg-white border-slate-300'}
                `}>
                  <span className="text-4xl mb-1">{card.emoji}</span>
                  <span className="text-sm font-bold text-slate-700 text-center leading-tight">{card.name}</span>
                  {card.isMatched && (
                    <div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-600 opacity-50" />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Special Effects Overlay */}
      {specialEffect === 'jackpot' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-[150px] drop-shadow-[0_0_50px_rgba(250,204,21,0.8)]"
          >
            🎰 NỔ HỦ!
          </motion.div>
        </motion.div>
      )}

      {specialEffect === 'bomb' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-red-900/80 backdrop-blur-md pointer-events-none"
        >
          <motion.div 
            animate={{ scale: [1, 1.5, 2, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="text-[200px] drop-shadow-[0_0_100px_rgba(239,68,68,1)]"
          >
            💥
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FlipPhase;
