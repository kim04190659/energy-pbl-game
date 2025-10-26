import { CardData, CardType } from '../types/card.types';

export const municipalityCards: CardData[] = [
  // ペルソナカード
  {
    id: 'persona-muni-001',
    type: 'persona',
    title: '市長',
    description: '人口減少と財政難に直面。持続可能なまちづくりを目指す',
    category: 'leadership',
    tags: ['政策', '意思決定', '予算'],
  },
  {
    id: 'persona-muni-002',
    type: 'persona',
    title: '地域住民代表',
    description: '高齢化が進む地域で、若者を呼び戻したいと願う',
    category: 'citizen',
    tags: ['住民', '地域活性化', 'コミュニティ'],
  },
  {
    id: 'persona-muni-003',
    type: 'persona',
    title: 'NPO理事長',
    description: '地域課題解決に情熱を持つ。リソース不足が悩み',
    category: 'npo',
    tags: ['非営利', '社会貢献', 'ボランティア'],
  },
  {
    id: 'persona-muni-004',
    type: 'persona',
    title: 'IT企業社員',
    description: 'リモートワークで地方移住。地域に貢献したい',
    category: 'business',
    tags: ['移住', 'IT', 'リモートワーク'],
  },

  // 問題カード
  {
    id: 'problem-muni-001',
    type: 'problem',
    title: '人口減少と高齢化',
    description: '若者の流出が止まらず、高齢化率が40%を超えた',
    score: -80,
    category: 'demographics',
    tags: ['人口減少', '高齢化', '若者流出'],
  },
  {
    id: 'problem-muni-002',
    type: 'problem',
    title: '空き家の増加',
    description: '市内の空き家が500軒を超え、防犯・景観上の問題に',
    score: -60,
    category: 'infrastructure',
    tags: ['空き家', '防犯', '景観'],
  },
  {
    id: 'problem-muni-003',
    type: 'problem',
    title: '公共交通の不便さ',
    description: 'バス路線が廃止され、高齢者の移動手段がない',
    score: -70,
    category: 'mobility',
    tags: ['交通', 'モビリティ', '高齢者'],
  },
  {
    id: 'problem-muni-004',
    type: 'problem',
    title: '商店街のシャッター街化',
    description: '中心市街地の店舗が次々閉店。活気が失われた',
    score: -65,
    category: 'economy',
    tags: ['商店街', '経済', '中心市街地'],
  },

  // パートナーカード
  {
    id: 'partner-muni-001',
    type: 'partner',
    title: '地域おこし協力隊',
    description: '外部人材を活用した地域活性化の実行部隊',
    score: 40,
    category: 'support',
    tags: ['協力隊', '外部人材', '実行力'],
  },
  {
    id: 'partner-muni-002',
    type: 'partner',
    title: '大学研究室',
    description: 'データ分析や政策提案の専門知識を提供',
    score: 35,
    category: 'academic',
    tags: ['大学', '研究', 'データ分析'],
  },
  {
    id: 'partner-muni-003',
    type: 'partner',
    title: '地元企業',
    description: '雇用創出と地域経済の活性化に貢献',
    score: 45,
    category: 'business',
    tags: ['企業', '雇用', '経済'],
  },
  {
    id: 'partner-muni-004',
    type: 'partner',
    title: 'シビックテック団体',
    description: 'ITを使った市民参加型の課題解決',
    score: 50,
    category: 'technology',
    tags: ['IT', 'シビックテック', 'オープンデータ'],
  },

  // ジョブカード
  {
    id: 'job-muni-001',
    type: 'job',
    title: '移住促進プロジェクト',
    description: '空き家バンクとお試し移住で若者を誘致',
    score: 60,
    category: 'project',
    tags: ['移住', '空き家活用', 'プロモーション'],
  },
  {
    id: 'job-muni-002',
    type: 'job',
    title: 'コミュニティバス運行',
    description: '住民主体の交通サービスで移動問題を解決',
    score: 50,
    category: 'service',
    tags: ['交通', 'コミュニティ', 'サービス'],
  },
  {
    id: 'job-muni-003',
    type: 'job',
    title: 'リビングラボ設立',
    description: '住民・企業・行政が協働で実験的な取り組みを実施',
    score: 70,
    category: 'innovation',
    tags: ['協働', '実験', 'イノベーション'],
  },
  {
    id: 'job-muni-004',
    type: 'job',
    title: 'デジタル市役所構築',
    description: '行政手続きをオンライン化し利便性向上',
    score: 55,
    category: 'digital',
    tags: ['DX', 'オンライン', '行政サービス'],
  },
];

// カードタイプごとに取得
export const getCardsByType = (type: CardType) => {
  return municipalityCards.filter(card => card.type === type);
};
