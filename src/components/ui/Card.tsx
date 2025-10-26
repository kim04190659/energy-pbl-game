import React from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../../types/card.types';

interface CardProps {
  card: CardData;
  onClick?: () => void;
  isSelected?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, isSelected = false }) => {
  const getCardGradient = () => {
    switch (card.type) {
      case 'persona': return 'from-blue-500 via-blue-600 to-blue-700';
      case 'problem': return 'from-red-500 via-red-600 to-red-700';
      case 'partner': return 'from-green-500 via-green-600 to-green-700';
      case 'job': return 'from-orange-500 via-orange-600 to-orange-700';
      default: return 'from-gray-500 via-gray-600 to-gray-700';
    }
  };

  const getCardIcon = () => {
    switch (card.type) {
      case 'persona': return '👤';
      case 'problem': return '⚠️';
      case 'partner': return '🤝';
      case 'job': return '💼';
      default: return '📄';
    }
  };

  const getCardTypeLabel = () => {
    switch (card.type) {
      case 'persona': return 'ペルソナ';
      case 'problem': return '課題';
      case 'partner': return 'パートナー';
      case 'job': return '施策';
      default: return '';
    }
  };

  return (
    <motion.div
      className={`
        relative w-48 h-64 rounded-2xl cursor-pointer
        bg-gradient-to-br ${getCardGradient()}
        overflow-hidden
        ${isSelected ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-purple-900' : ''}
      `}
      onClick={onClick}
      whileHover={{ 
        scale: 1.08, 
        y: -15,
        rotateY: 5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 120
      }}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: isSelected 
          ? '0 20px 60px rgba(251, 191, 36, 0.4), 0 0 20px rgba(251, 191, 36, 0.3)'
          : '0 10px 40px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* 背景パターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl" />
      </div>

      {/* カードタイプラベル */}
      <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-white font-bold shadow-lg">
        {getCardTypeLabel()}
      </div>

      {/* スコア表示 */}
      {card.score && (
        <motion.div 
          className="absolute top-3 right-3 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-xl"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-bold text-gray-900">
            {card.score > 0 ? '+' : ''}{card.score}
          </span>
        </motion.div>
      )}

      {/* 選択マーク */}
      {isSelected && (
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl drop-shadow-2xl"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          ✓
        </motion.div>
      )}

      {/* カード中央部 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 py-6">
        {/* アイコン */}
        <motion.div 
          className="text-7xl mb-4 drop-shadow-2xl filter"
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {getCardIcon()}
        </motion.div>

        {/* タイトル */}
        <h3 className="text-white text-lg font-bold text-center mb-3 leading-tight drop-shadow-lg">
          {card.title}
        </h3>

        {/* 説明 */}
        <p className="text-white/95 text-sm text-center leading-relaxed drop-shadow-md">
          {card.description}
        </p>
      </div>

      {/* カテゴリタグ */}
      {card.category && (
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-lg">
            <span className="text-xs text-white/90 font-medium">
              {card.category}
            </span>
          </div>
        </div>
      )}

      {/* グロー効果 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      
      {/* 選択時のパルスエフェクト */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-4 border-yellow-400 rounded-2xl"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};
