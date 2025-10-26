import React from 'react';
import { motion } from 'framer-motion';
import { GameConfig } from '../../types/game-config.types';

interface ThemeSelectorProps {
  themes: GameConfig[];
  onSelectTheme: (theme: GameConfig) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, onSelectTheme }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            🎮 PBL カードゲーム
          </h1>
          <p className="text-white/80 text-xl">
            テーマを選択してください
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map((theme, index) => (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectTheme(theme)}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 hover:border-white/40 transition-all text-left"
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-6xl mb-4">{theme.theme.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {theme.name}
              </h2>
              <p className="text-white/70 mb-4">
                {theme.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                  {theme.cards.personas.length}種類のペルソナ
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm">
                  {theme.cards.problems.length}種類の課題
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">
            Created by 木村好孝 | 汎用版 v1.0
          </p>
        </motion.div>
      </div>
    </div>
  );
};
