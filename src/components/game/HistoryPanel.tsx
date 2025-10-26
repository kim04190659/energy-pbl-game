import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoryManager, PlayHistory } from '../../utils/history';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState(HistoryManager.getStats());

  useEffect(() => {
    if (isOpen) {
      setStats(HistoryManager.getStats());
    }
  }, [isOpen]);

  const handleClearHistory = () => {
    if (confirm('履歴を全て削除しますか？')) {
      HistoryManager.clearHistory();
      setStats(HistoryManager.getStats());
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full md:w-96 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              {/* ヘッダー */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">📊 プレイ履歴</h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white text-2xl transition-colors"
                >
                  ✕
                </button>
              </div>

              {stats.totalPlays === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎮</div>
                  <p className="text-white/60">まだプレイ履歴がありません</p>
                </div>
              ) : (
                <>
                  {/* 統計情報 */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                    >
                      <div className="text-white/60 text-sm mb-1">総プレイ回数</div>
                      <div className="text-white text-3xl font-bold">{stats.totalPlays}</div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                    >
                      <div className="text-white/60 text-sm mb-1">平均スコア</div>
                      <div className="text-white text-3xl font-bold">{stats.averageScore}</div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-4 border-2 border-yellow-400/50"
                    >
                      <div className="text-yellow-300 text-sm mb-1">最高スコア 🏆</div>
                      <div className="text-white text-3xl font-bold">{stats.highestScore}</div>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                    >
                      <div className="text-white/60 text-sm mb-1">最低スコア</div>
                      <div className="text-white text-3xl font-bold">{stats.lowestScore}</div>
                    </motion.div>
                  </div>

                  {/* 最近のプレイ */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">最近のプレイ</h3>
                    <div className="space-y-3">
                      {stats.recentPlays.map((play, index) => (
                        <motion.div
                          key={play.id}
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="text-white font-bold text-2xl">{play.score}点</div>
                              <div className="text-white/60 text-sm">{play.evaluation}</div>
                            </div>
                            <div className="text-white/40 text-xs">{formatDate(play.timestamp)}</div>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="text-white/60">
                              <span className="text-blue-300">👤</span> {play.persona}
                            </div>
                            <div className="text-white/60">
                              <span className="text-red-300">⚠️</span> {play.problem}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* クリアボタン */}
                  <button
                    onClick={handleClearHistory}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold py-3 px-6 rounded-xl border border-red-500/50 transition-all"
                  >
                    履歴をクリア
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
