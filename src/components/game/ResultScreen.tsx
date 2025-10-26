import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🎊 結果発表！
          </h1>
          <p className="text-white/80 text-xl">
            あなたの地域課題解決プランの評価
          </p>
        </motion.div>

        {/* スコアカード */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-white/20"
        >
          {/* 総合評価 */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="inline-block"
            >
              <div className="text-8xl font-bold text-yellow-400 mb-4">
                {result.totalScore}
              </div>
              <div className="text-3xl font-bold text-white">
                {result.evaluation}
              </div>
            </motion.div>
          </div>

          {/* スコア内訳 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-red-500/20 rounded-xl p-4 text-center"
            >
              <div className="text-red-300 text-sm mb-2">課題の重要度</div>
              <div className="text-3xl font-bold text-white">
                {result.breakdown.problemScore}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-green-500/20 rounded-xl p-4 text-center"
            >
              <div className="text-green-300 text-sm mb-2">ソリューション効果</div>
              <div className="text-3xl font-bold text-white">
                {result.breakdown.solutionScore}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-yellow-500/20 rounded-xl p-4 text-center"
            >
              <div className="text-yellow-300 text-sm mb-2">シナジーボーナス</div>
              <div className="text-3xl font-bold text-white">
                +{result.breakdown.synergyBonus}
              </div>
            </motion.div>
          </div>

          {/* フィードバック */}
          <div className="space-y-3">
            {result.feedback.map((message, index) => (
              <motion.div
                key={index}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white/10 rounded-lg p-4"
              >
                <p className="text-white text-lg">{message}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 選択したカード一覧 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            📋 あなたの選択
          </h2>
          
          <div className="space-y-4">
            {selectedCards.persona && (
              <div className="flex items-center gap-4 bg-blue-500/20 rounded-lg p-4">
                <span className="text-4xl">👤</span>
                <div>
                  <div className="text-blue-300 text-sm">役割</div>
                  <div className="text-white font-bold">{selectedCards.persona.title}</div>
                </div>
              </div>
            )}

            {selectedCards.problem && (
              <div className="flex items-center gap-4 bg-red-500/20 rounded-lg p-4">
                <span className="text-4xl">⚠️</span>
                <div>
                  <div className="text-red-300 text-sm">課題</div>
                  <div className="text-white font-bold">{selectedCards.problem.title}</div>
                </div>
              </div>
            )}

            {selectedCards.partners.map((card) => (
              <div key={card.id} className="flex items-center gap-4 bg-green-500/20 rounded-lg p-4">
                <span className="text-4xl">🤝</span>
                <div>
                  <div className="text-green-300 text-sm">パートナー</div>
                  <div className="text-white font-bold">{card.title}</div>
                </div>
              </div>
            ))}

            {selectedCards.jobs.map((card) => (
              <div key={card.id} className="flex items-center gap-4 bg-orange-500/20 rounded-lg p-4">
                <span className="text-4xl">💼</span>
                <div>
                  <div className="text-orange-300 text-sm">施策</div>
                  <div className="text-white font-bold">{card.title}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* アクションボタン */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={onRestart}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all text-lg"
          >
            🔄 もう一度プレイ
          </button>
          
          <button
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all text-lg"
          >
            📤 結果をシェア
          </button>
        </motion.div>
      </div>
    </div>
  );
};
