import React from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../../types/card.types';

interface CardProps {
  card: CardData;
  onClick?: () => void;
  isSelected?: boolean;
}

export const Card: React.FC<CardProps> = ({ card, onClick, isSelected = false }) => {
  const getCardColor = () => {
    switch (card.type) {
      case 'persona': return 'bg-card-persona';
      case 'problem': return 'bg-card-problem';
      case 'partner': return 'bg-card-partner';
      case 'job': return 'bg-card-job';
      default: return 'bg-gray-600';
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
        relative w-48 h-64 rounded-xl shadow-2xl cursor-pointer
        ${getCardColor()}
        overflow-hidden
        ${isSelected ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}
      `}
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
    >
      {/* カードタイプラベル */}
      <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-bold">
        {getCardTypeLabel()}
      </div>

      {/* スコア表示 */}
      {card.score && (
        <div className="absolute top-2 right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-sm font-bold text-gray-900">
            {card.score > 0 ? '+' : ''}{card.score}
          </span>
        </div>
      )}

      {/* 選択マーク */}
      {isSelected && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
          ✓
        </div>
      )}

      {/* カード中央部 */}
      <div className="flex flex-col items-center justify-center h-full px-4 py-6">
        {/* アイコン */}
        <div className="text-6xl mb-4 drop-shadow-lg">
          {getCardIcon()}
        </div>

        {/* タイトル */}
        <h3 className="text-white text-lg font-bold text-center mb-3 leading-tight">
          {card.title}
        </h3>

        {/* 説明 */}
        <p className="text-white/90 text-sm text-center leading-relaxed">
          {card.description}
        </p>
      </div>

      {/* カテゴリタグ */}
      {card.category && (
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-white/10 backdrop-blur-sm rounded px-2 py-1">
            <span className="text-xs text-white/80">
              {card.category}
            </span>
          </div>
        </div>
      )}

      {/* ホバーエフェクト用のグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};
