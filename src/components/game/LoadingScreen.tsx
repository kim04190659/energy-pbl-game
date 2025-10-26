import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const steps = 100;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(onComplete, 500);
      } else {
        setProgress(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      <div className="text-center">
        {/* アイコン */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-9xl mb-8"
        >
          🏙️
        </motion.div>

        {/* タイトル */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold text-white mb-4"
        >
          スマートシティ PBL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/80 text-xl mb-12"
        >
          カードゲーム
        </motion.p>

        {/* カードシャッフルアニメーション */}
        <div className="flex justify-center gap-4 mb-8">
          {['🎭', '⚠️', '🤝', '💼'].map((icon, i) => (
            <motion.div
              key={i}
              className="w-16 h-24 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl border-2 border-white/30"
              initial={{ y: -100, opacity: 0, rotateY: -90 }}
              animate={{
                y: 0,
                opacity: 1,
                rotateY: 0,
              }}
              transition={{
                delay: 0.9 + i * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
            >
              {icon}
            </motion.div>
          ))}
        </div>

        {/* プログレスバー */}
        <div className="w-80 mx-auto">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <motion.p
            className="text-white/60 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading... {progress}%
          </motion.p>
        </div>

        {/* クレジット */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white/40 text-sm mt-12"
        >
          Created by 木村好孝
        </motion.p>
      </div>

      {/* 背景パーティクル */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -20,
            }}
            animate={{
              y: window.innerHeight + 20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
