import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameResult } from '../../utils/scoring';
import { CardData } from '../../types/card.types';

interface ResultScreenProps {
  result: GameResult;
  selectedCards: {
    persona: CardData | null;
    problem: CardData | null;
    partners: CardData[];
    jobs: CardData[];
  };
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  selectedCards,
  onRestart,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = result.totalScore / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= result.totalScore) {
        setAnimatedScore(result.totalScore);
        clearInterval(timer);
        if (result.totalScore >= 150) {
          setShowConfetti(true);
        }
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result.totalScore]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -20,
            }}
            animate={{
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
                  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 500,
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.02,
                }}
              >
                {['🎊', '🎉', '✨', '⭐', '🌟'][i % 5]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-6xl font-bold text-white mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎊 結果発表！
          </motion.h1>
          <p className="text-white/80 text-xl">
            あなたの地域課題解決プランの評価
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl border-2 border-white/30"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
              className="inline-block"
            >
              <motion.div 
                className="text-9xl font-bold mb-4"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 10px 20px rgba(251, 191, 36, 0.3))'
                }}
              >
                {animatedScore}
              </motion.div>
              <motion.div 
                className="text-4xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2 }}
              >
                {result.evaluation}
              </motion.div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: '課題の重要度', value: result.breakdown.problemScore, color: 'red', delay: 0.7 },
              { label: 'ソリューション効果', value: result.breakdown.solutionScore, color: 'green', delay: 0.9 },
              { label: 'シナジーボーナス', value: result.breakdown.synergyBonus, color: 'yellow', delay: 1.1 },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: item.delay, type: 'spring' }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-${item.color}-500/30 backdrop-blur-sm rounded-2xl p-6 text-center border-2 border-${item.color}-400/50 shadow-lg`}
              >
                <div className={`text-${item.color}-300 text-sm mb-2 font-semibold`}>{item.label}</div>
                <motion.div 
                  className="text-4xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: item.delay + 0.2, type: 'spring', stiffness: 200 }}
                >
                  {item.value > 0 && item.color === 'yellow' ? '+' : ''}{item.value}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-3">
            {result.feedback.map((message, index) => (
              <motion.div
                key={index}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.15 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/20 shadow-lg"
              >
                <p className="text-white text-lg font-medium">{message}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border-2 border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            📋 あなたの選択
          </h2>
          
          <div className="space-y-4">
            {selectedCards.persona && (
              <motion.div 
                className="flex items-center gap-4 bg-blue-500/30 backdrop-blur-sm rounded-xl p-5 border-2 border-blue-400/50"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <span className="text-5xl">👤</span>
                <div>
                  <div className="text-blue-300 text-sm font-semibold">役割</div>
                  <div className="text-white font-bold text-lg">{selectedCards.persona.title}</div>
                </div>
              </motion.div>
            )}

            {selectedCards.problem && (
              <motion.div 
                className="flex items-center gap-4 bg-red-500/30 backdrop-blur-sm rounded-xl p-5 border-2 border-red-400/50"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <span className="text-5xl">⚠️</span>
                <div>
                  <div className="text-red-300 text-sm font-semibold">課題</div>
                  <div className="text-white font-bold text-lg">{selectedCards.problem.title}</div>
                </div>
              </motion.div>
            )}

            {selectedCards.partners.map((card, index) => (
              <motion.div 
                key={card.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2 + index * 0.1 }}
                className="flex items-center gap-4 bg-green-500/30 backdrop-blur-sm rounded-xl p-5 border-2 border-green-400/50"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <span className="text-5xl">🤝</span>
                <div>
                  <div className="text-green-300 text-sm font-semibold">パートナー</div>
                  <div className="text-white font-bold text-lg">{card.title}</div>
                </div>
              </motion.div>
            ))}

            {selectedCards.jobs.map((card, index) => (
              <motion.div 
                key={card.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.2 + index * 0.1 }}
                className="flex items-center gap-4 bg-orange-500/30 backdrop-blur-sm rounded-xl p-5 border-2 border-orange-400/50"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <span className="text-5xl">💼</span>
                <div>
                  <div className="text-orange-300 text-sm font-semibold">施策</div>
                  <div className="text-white font-bold text-lg">{card.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          <motion.button
            onClick={onRestart}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl transition-all text-xl"
            whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 もう一度プレイ
          </motion.button>
          
          <motion.button
            onClick={() => {
              const url = window.location.href;
              const text = `スマートシティPBLゲームで${result.totalScore}点獲得！ ${result.evaluation}`;
              if (navigator.share) {
                navigator.share({ title: text, url });
              } else {
                navigator.clipboard.writeText(`${text}\n${url}`);
                alert('URLをコピーしました！');
              }
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl transition-all text-xl"
            whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            📤 結果をシェア
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
