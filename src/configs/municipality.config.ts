import { GameConfig } from '../types/game-config.types';
import { municipalityCards } from '../data/municipality-cards';

export const municipalityConfig: GameConfig = {
  id: 'municipality',
  name: '自治体版',
  description: '地域課題を解決するための最適なチームを組み立てる',
  
  theme: {
    title: '🏙️ スマートシティ PBL カードゲーム',
    subtitle: '地域課題を解決するための最適なチームを組み立てよう',
    icon: '🏙️',
    colors: {
      primary: 'from-purple-900 via-blue-900 to-indigo-900',
      secondary: 'from-blue-500 via-blue-600 to-blue-700',
      accent: 'from-yellow-400 to-orange-500',
    },
  },
  
  cards: {
    personas: municipalityCards.filter(c => c.type === 'persona'),
    problems: municipalityCards.filter(c => c.type === 'problem'),
    partners: municipalityCards.filter(c => c.type === 'partner'),
    jobs: municipalityCards.filter(c => c.type === 'job'),
  },
  
  scoring: {
    synergyRules: [],
    evaluationThresholds: {
      S: 200,
      A: 150,
      B: 100,
      C: 0,
    },
  },
  
  ui: {
    showTutorial: true,
    allowMultipleSelection: true,
  },
};
