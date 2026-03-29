import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../store/GameContext';
import { WheelItem } from '../../types';

type Props = {
  type: 'reward' | 'penalty';
};

const WheelPhase: React.FC<Props> = ({ type }) => {
  const { config, gameState, dispatch } = useGame();
  const items = type === 'reward' ? config.rewardWheel : config.penaltyWheel;
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const slices = useMemo(() => {
    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
    let currentAngle = 0;
    return items.map(item => {
      const angle = ((item.weight || 1) / totalWeight) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      return { ...item, startAngle, endAngle, angle };
    });
  }, [items]);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
    const randomWeight = Math.random() * totalWeight;
    
    let currentWeight = 0;
    let winningIndex = 0;
    for (let i = 0; i < items.length; i++) {
      currentWeight += (items[i].weight || 1);
      if (randomWeight <= currentWeight) {
        winningIndex = i;
        break;
      }
    }

    const winningSlice = slices[winningIndex];
    // Random offset within the slice to make it look natural (avoid edges)
    const randomOffset = (Math.random() * 0.8 + 0.1) * winningSlice.angle;
    
    // The pointer is at the top (0 degrees relative to SVG center if we start drawing from -90)
    // Actually, our drawing starts at 0 degrees (which is right side, 3 o'clock) and rotates clockwise.
    // Wait, the createPieSlice uses (startAngle - 90), so 0 degrees is at 12 o'clock (top).
    // So if we rotate the SVG by R degrees, the point at 12 o'clock will be the one that was originally at 360 - R degrees.
    // We want the winning slice to be at 12 o'clock.
    // So 360 - R = winningSlice.startAngle + randomOffset
    // R = 360 - (winningSlice.startAngle + randomOffset)
    
    const targetAngle = 360 - (winningSlice.startAngle + randomOffset);
    const spinSpins = 5 + Math.floor(Math.random() * 5); // 5-10 full spins
    const totalRotation = rotation + (spinSpins * 360) + targetAngle - (rotation % 360);

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      handleResult(items[winningIndex]);
    }, 3500);
  };

  const handleResult = (result: WheelItem) => {
    dispatch({ type: 'SET_WHEEL_RESULT', result, isReward: type === 'reward' });
    
    setTimeout(() => {
      if (result.type === 'points') {
        dispatch({ type: 'ADD_SCORE', teamIdx: gameState.teamIdx, points: result.value });
        dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
      } else if (result.type === 'none') {
        dispatch({ type: 'NEXT_TURN', totalQuestions: config.questions.length });
      } else if (result.type === 'challenge') {
        dispatch({ type: 'SET_PHASE', phase: 'CHALLENGE_MODAL' });
      } else if (result.type === 'give') {
        dispatch({ type: 'SET_PHASE', phase: 'GIVE_MODAL' });
      } else if (result.type === 'music') {
        dispatch({ type: 'SET_PHASE', phase: 'MUSIC_MODAL' });
      }
    }, 1500);
  };

  const createPieSlice = (slice: typeof slices[0], index: number) => {
    // Handle case where there is only 1 slice (360 degrees)
    if (slice.angle === 360) {
      return <circle key={index} cx="260" cy="260" r="260" fill={slice.color} stroke="white" strokeWidth="3" />;
    }

    const startRad = (slice.startAngle - 90) * Math.PI / 180;
    const endRad = (slice.endAngle - 90) * Math.PI / 180;
    
    const x1 = 260 + 260 * Math.cos(startRad);
    const y1 = 260 + 260 * Math.sin(startRad);
    const x2 = 260 + 260 * Math.cos(endRad);
    const y2 = 260 + 260 * Math.sin(endRad);
    
    const largeArcFlag = slice.angle > 180 ? 1 : 0;
    
    const d = [
      "M", 260, 260,
      "L", x1, y1,
      "A", 260, 260, 0, largeArcFlag, 1, x2, y2,
      "Z"
    ].join(" ");

    return <path key={index} d={d} fill={slice.color} stroke="white" strokeWidth="3" />;
  };

  const createText = (slice: typeof slices[0], index: number) => {
    const midAngle = slice.startAngle + slice.angle / 2;
    const midRad = (midAngle - 90) * Math.PI / 180;
    
    // Move text further out for better readability
    const radius = 160;
    const x = 260 + radius * Math.cos(midRad);
    const y = 260 + radius * Math.sin(midRad);
    
    // Rotate text along the radius. If it's on the left side, flip it so it's readable
    let textRotation = midAngle - 90;
    if (midAngle > 180 && midAngle < 360) {
      textRotation += 180;
    }
    
    return (
      <text
        key={`t-${index}`}
        x={x}
        y={y}
        fill="white"
        fontSize="22"
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
        transform={`rotate(${textRotation}, ${x}, ${y})`}
        className="drop-shadow-md"
      >
        {slice.name}
      </text>
    );
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center space-y-8 w-full h-full"
    >
      <h2 className={`text-5xl font-bold uppercase tracking-widest ${type === 'reward' ? 'text-blue-600' : 'text-red-600'}`}>
        Vòng quay {type === 'reward' ? 'Thưởng' : 'Phạt'}
      </h2>

      <div className="relative w-[520px] h-[520px]">
        {/* Pointer */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[50px] border-t-slate-800 drop-shadow-lg" />
        
        {/* Wheel */}
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full shadow-2xl overflow-hidden border-[10px] border-slate-800 bg-slate-200"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
          }}
        >
          <svg width="520" height="520" viewBox="0 0 520 520">
            {slices.map((slice, idx) => createPieSlice(slice, idx))}
            {slices.map((slice, idx) => createText(slice, idx))}
          </svg>
        </div>
        
        {/* Center Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-slate-800 rounded-full border-[5px] border-white shadow-inner z-10" />
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`px-16 py-6 rounded-2xl text-4xl font-black text-white shadow-xl transition-all ${
          isSpinning ? 'opacity-50 cursor-not-allowed bg-slate-400' : type === 'reward' ? 'bg-blue-500 hover:bg-blue-600 hover:scale-105' : 'bg-red-500 hover:bg-red-600 hover:scale-105'
        }`}
      >
        🎰 QUAY!
      </button>
    </motion.div>
  );
};

export default WheelPhase;
