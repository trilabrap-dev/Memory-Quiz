import React from 'react';
import { motion } from 'motion/react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-80" />
      
      {/* Floating Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 100, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 50, -100, 0],
          y: [0, 50, 100, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[40%] left-[60%] w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-3xl"
      />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />
    </div>
  );
};

export default BackgroundAnimation;
