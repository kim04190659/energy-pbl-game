import { GameConfig } from '../types/game-config.types';
import { CardData } from '../types/card.types';

const energyCards: CardData[] = [
  {
    id: 'persona-energy-001',
    type: 'persona',
    title: 'エネルギー政策担当',
    description: '再生可能エネルギー導入を推進する行政担当者',
    category: 'government',
  },
  {
    id: 'persona-energy-002',
    type: 'persona',
    title: '電力会社エンジニア',
    description: '送配電網の最適化を目指す技術者',
    category: 'utility',
  },
  {
    id: 'persona-energy-003',
    type: 'persona',
    title: '市民活動家',
    description: '脱炭素社会を目指すコミュニティリーダー',
    category: 'citizen',
  },
  {
    id: 'persona-energy-004',
    type: 'persona',
    title: 'IoT企業CEO',
    description: 'エネルギーマネジメントシステムを開発',
    category: 'tech',
  },
  {
    id: 'problem-energy-001',
    type: 'problem',
    title: '電力需給の不安定化',
    description: '再エネ導入で電力供給が不安定に',
    score: -80,
    category: 'stability',
  },
  {
    id: 'problem-energy-002',
    type: 'problem',
    title: 'CO2排出量の増加',
    description: '化石燃料依存で環境負荷が大きい',
    score: -90,
    category: 'environment',
  },
  {
    id: 'problem-energy-003',
    type: 'problem',
    title: '電気料金の高騰',
    description: '家庭や企業の電気代が上昇',
    score: -70,
    category: 'economy',
  },
  {
    id: 'problem-energy-004',
    type: 'problem',
    title: '送配電網の老朽化',
    description: 'インフラの更新が必要',
    score: -75,
    category: 'infrastructure',
  },
  {
    id: 'partner-energy-001',
    type: 'partner',
    title: '太陽光発電事業者',
    description: '再生可能エネルギーの供給源',
    score: 45,
    category: 'renewable',
  },
  {
    id: 'partner-energy-002',
    type: 'partner',
    title: '蓄電池メーカー',
    description: 'エネルギー貯蔵技術を提供',
    score: 50,
    category: 'storage',
  },
  {
    id: 'partner-energy-003',
    type: 'partner',
    title: 'AIベンチャー',
    description: '需給予測システムを開発',
    score: 40,
    category: 'tech',
  },
  {
    id: 'partner-energy-004',
    type: 'partner',
    title: '地域金融機関',
    description: 'グリーンファイナンスで資金支援',
    score: 35,
    category: 'finance',
  },
  {
    id: 'job-energy-001',
    type: 'job',
    title: 'VPP構築',
    description: '分散電源を統合制御するシステム',
    score: 70,
    category: 'technology',
  },
  {
    id: 'job-energy-002',
    type: 'job',
    title: 'デマンドレスポンス導入',
    description: '需要側の柔軟性を活用',
    score: 60,
    category: 'management',
  },
  {
    id: 'job-energy-003',
    type: 'job',
    title: 'マイクログリッド構築',
    description: '地域単位でエネルギー自立',
    score: 65,
    category: 'infrastructure',
  },
  {
    id: 'job-energy-004',
    type: 'job',
    title: 'P2P電力取引',
    description: '電力の個人間取引プラットフォーム',
    score: 55,
    category: 'innovation',
  },
];

export const energyConfig: GameConfig = {
  id: 'energy',
  name: 'エネルギー版',
  description: 'エネルギー課題を解決するイノベーションプランを作成',
  
  theme: {
    title: '⚡ エネルギーイノベーション PBLゲーム',
    subtitle: '持続可能なエネルギーシステムを設計しよう',
    icon: '⚡',
    colors: {
      primary: 'from-green-900 via-teal-900 to-cyan-900',
      secondary: 'from-green-500 via-teal-600 to-cyan-700',
      accent: 'from-yellow-400 to-orange-500',
    },
  },
  
  cards: {
    personas: energyCards.filter(c => c.type === 'persona'),
    problems: energyCards.filter(c => c.type === 'problem'),
    partners: energyCards.filter(c => c.type === 'partner'),
    jobs: energyCards.filter(c => c.type === 'job'),
  },
  
  scoring: {
    synergyRules: [],
    evaluationThresholds: {
      S: 220,
      A: 170,
      B: 120,
      C: 0,
    },
  },
  
  ui: {
    showTutorial: true,
    allowMultipleSelection: true,
  },
};
