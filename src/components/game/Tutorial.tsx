import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onSkip: () => void;
  phase: 'select-persona' | 'select-problem' | 'select-solution' | null;
}

export const Tutorial: React.FC<TutorialProps> = ({ step, totalSteps, onNext, onSkip, phase }) => {
  const getTutorialContent = () => {
    switch (step) {
      case 0:
        return {
          title: '👋 ようこそ！',
          description: 'スマートシティPBLカードゲームへようこそ！このゲームでは、地域課題を解決するための最適なチームを組み立てます。',
          tips: [
            '🎯 3つのステップで課題解決プランを作成',
            '💡 カードの組み合わせでスコアが変わります',
            '⭐ 高得点を目指しましょう！'
          ]
        };
      case 1:
        return {
          title: '🎭 ステップ1: ペルソナ選択',
          description: 'まず、あなたの役割を選びます。それぞれの立場で異なる視点から課題に取り組めます。',
          tips: [
            '市長：政策決定権があります',
            '住民代表：地域の声を代弁します',
            'NPO理事長：現場の課題を知っています',
            'IT企業社員：テクノロジーで支援します'
          ]
        };
      case 2:
        return {
          title: '⚠️ ステップ2: 課題選択',
          description: '解決したい地域課題を選びます。課題によってスコアが異なります。',
          tips: [
            '📊 スコアの高い課題ほど重要度が高い',
            '🎯 ペルソナとの相性もあります',
            '💭 実際の地域をイメージしてみましょう'
          ]
        };
      case 3:
        return {
          title: '💡 ステップ3: ソリューション構築',
          description: 'パートナーと施策を組み合わせて、課題解決のプランを作ります。',
          tips: [
            '🤝 パートナー：協力してくれる組織',
            '💼 施策：具体的な解決策',
            '✨ 複数選択でシナジー効果が生まれます',
            '🎨 相性の良い組み合わせを探しましょう'
          ]
        };
      case 4:
        return {
          title: '🎊 結果とスコアリング',
          description: '選択したカードの組み合わせでスコアが計算されます。',
          tips: [
            '📈 基本スコア：各カードの点数',
            '⚡ シナジーボーナス：相性の良い組み合わせ',
            '🏆 S評価（200点以上）を目指そう！',
            '🔄 何度でもプレイできます'
          ]
        };
      default:
        return null;
    }
  };

  const content = getTutorialContent();
  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onSkip}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150 }}
          className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 max-w-2xl mx-4 shadow-2xl border-4 border-white/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ヘッダー */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-7xl mb-4"
            >
              {step === 0 ? '🎮' : step === 1 ? '🎭' : step === 2 ? '⚠️' : step === 3 ? '💡' : '🎊'}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-white mb-3"
            >
              {content.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-lg leading-relaxed"
            >
              {content.description}
            </motion.p>
          </div>

          {/* ヒント */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6"
          >
            <div className="space-y-3">
              {content.tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-yellow-300 text-xl mt-0.5">•</span>
                  <span className="text-white text-base leading-relaxed">{tip}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* プログレス */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-2">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i <= step ? 'bg-yellow-400 w-12' : 'bg-white/20 w-8'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-white/60 text-sm">
              {step + 1} / {totalSteps}
            </p>
          </div>

          {/* ボタン */}
          <div className="flex gap-4">
            <motion.button
              onClick={onSkip}
              className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-xl transition-all border-2 border-white/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              スキップ
            </motion.button>
            <motion.button
              onClick={onNext}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              {step === totalSteps - 1 ? '始める！ 🚀' : '次へ →'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
