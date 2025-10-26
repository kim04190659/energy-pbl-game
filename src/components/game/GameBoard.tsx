import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { municipalityCards, getCardsByType } from '../../data/municipality-cards';
import { CardData } from '../../types/card.types';

export const GameBoard: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<CardData[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'select-persona' | 'select-problem' | 'select-solution'>('select-persona');

  const personaCards = getCardsByType('persona');
  const problemCards = getCardsByType('problem');
  const partnerCards = getCardsByType('partner');
  const jobCards = getCardsByType('job');

  const handleCardClick = (card: CardData) => {
    console.log('カードクリック:', card.title);
    
    // 選択/解除のトグル
    const isSelected = selectedCards.some(c => c.id === card.id);
    
    if (isSelected) {
      setSelectedCards(selectedCards.filter(c => c.id !== card.id));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  const isCardSelected = (card: CardData) => {
    return selectedCards.some(c => c.id === card.id);
  };

  const getPhaseTitle = () => {
    switch (currentPhase) {
      case 'select-persona':
        return '🎭 ステップ1: あなたの役割を選んでください';
      case 'select-problem':
        return '⚠️ ステップ2: 解決したい課題を選んでください';
      case 'select-solution':
        return '💡 ステップ3: ソリューションを組み立てましょう';
      default:
        return '';
    }
  };

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case 'select-persona':
        return 'まず、あなたの立場を選びます。市長、住民、NPO、企業のどれになりますか？';
      case 'select-problem':
        return '次に、この地域が抱える課題を選びます。最も重要な問題は何でしょうか？';
      case 'select-solution':
        return '最後に、課題を解決するためのパートナーと施策を選びましょう！';
      default:
        return '';
    }
  };

  const getCurrentCards = () => {
    switch (currentPhase) {
      case 'select-persona':
        return personaCards;
      case 'select-problem':
        return problemCards;
      case 'select-solution':
        return [...partnerCards, ...jobCards];
      default:
        return [];
    }
  };

  const handleNextPhase = () => {
    if (currentPhase === 'select-persona') {
      setCurrentPhase('select-problem');
      setSelectedCards([]);
    } else if (currentPhase === 'select-problem') {
      setCurrentPhase('select-solution');
      setSelectedCards([]);
    } else {
      // 結果計算（Week 2以降で実装）
      alert('ゲーム完了！スコア計算機能はWeek 2で実装します。');
    }
  };

  const handleReset = () => {
    setCurrentPhase('select-persona');
    setSelectedCards([]);
  };

  const canProceed = selectedCards.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
      {/* ヘッダー */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🏙️ スマートシティ PBL カードゲーム
        </motion.h1>
        <motion.p 
          className="text-white/80 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          地域課題を解決するための最適なチームを組み立てよう
        </motion.p>
      </div>

      {/* フェーズ情報カード */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            {getPhaseTitle()}
          </h2>
          <p className="text-white/70 text-center mb-4">
            {getPhaseDescription()}
          </p>
          
          {selectedCards.length > 0 && (
            <div className="mt-4 p-4 bg-green-500/20 rounded-xl border border-green-500/30">
              <p className="text-white font-semibold text-center">
                ✅ 選択中: {selectedCards.map(c => c.title).join(', ')}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* プログレスバー */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className={`w-24 h-2 rounded-full ${currentPhase === 'select-persona' || currentPhase === 'select-problem' || currentPhase === 'select-solution' ? 'bg-green-500' : 'bg-white/20'}`} />
          <div className={`w-24 h-2 rounded-full ${currentPhase === 'select-problem' || currentPhase === 'select-solution' ? 'bg-green-500' : 'bg-white/20'}`} />
          <div className={`w-24 h-2 rounded-full ${currentPhase === 'select-solution' ? 'bg-green-500' : 'bg-white/20'}`} />
        </div>
      </div>

      {/* カード表示エリア */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {getCurrentCards().map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
              isSelected={isCardSelected(card)}
            />
          ))}
        </div>
      </div>

      {/* 操作ボタン */}
      <div className="max-w-7xl mx-auto flex justify-center gap-4 flex-wrap">
        <motion.button
          onClick={handleNextPhase}
          disabled={!canProceed}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all disabled:cursor-not-allowed text-lg"
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
        >
          {currentPhase === 'select-solution' ? '結果を見る 🎯' : '次へ進む →'}
        </motion.button>
        
        <motion.button
          onClick={() => setSelectedCards([])}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          選択をクリア
        </motion.button>

        <motion.button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          最初からやり直す
        </motion.button>
      </div>

      {/* フッター情報 */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 inline-block">
          <p className="text-white/60 text-sm">
            現在のフェーズ: <span className="font-bold text-white">{currentPhase}</span> | 
            選択カード数: <span className="font-bold text-white">{selectedCards.length}</span>
          </p>
          <p className="text-white/40 text-xs mt-2">
            Created by 木村好孝 | Week 1 Demo Version
          </p>
        </div>
      </div>
    </div>
  );
};

// framer-motionのインポートを追加
import { motion } from 'framer-motion';
