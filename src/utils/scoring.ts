import { CardData } from '../types/card.types';

export interface GameResult {
  totalScore: number;
  breakdown: {
    problemScore: number;
    solutionScore: number;
    synergyBonus: number;
  };
  evaluation: string;
  feedback: string[];
}

export function calculateScore(
  persona: CardData | null,
  problem: CardData | null,
  partners: CardData[],
  jobs: CardData[]
): GameResult {
  let totalScore = 0;
  const feedback: string[] = [];
  
  // 問題カードのスコア
  const problemScore = problem ? Math.abs(problem.score || 0) : 0;
  totalScore += problemScore;
  
  // ソリューションカードのスコア
  const solutionScore = [...partners, ...jobs].reduce(
    (sum, card) => sum + (card.score || 0),
    0
  );
  totalScore += solutionScore;
  
  // シナジーボーナス
  let synergyBonus = 0;
  
  // パートナーとジョブの相性チェック
  if (partners.length > 0 && jobs.length > 0) {
    synergyBonus += 20;
    feedback.push('✨ パートナーと施策を組み合わせました！');
  }
  
  // ペルソナと課題の相性
  if (persona && problem) {
    if (
      (persona.id === 'persona-muni-001' && problem.id === 'problem-muni-001') ||
      (persona.id === 'persona-muni-002' && problem.id === 'problem-muni-002')
    ) {
      synergyBonus += 30;
      feedback.push('🎯 ペルソナと課題の相性が抜群です！');
    }
  }
  
  // IT企業とデジタル施策の相性
  if (
    persona?.id === 'persona-muni-004' &&
    jobs.some(j => j.id === 'job-muni-004')
  ) {
    synergyBonus += 25;
    feedback.push('💻 IT人材がデジタル化を推進！');
  }
  
  totalScore += synergyBonus;
  
  // 評価判定
  let evaluation = '';
  if (totalScore >= 200) {
    evaluation = 'S評価：エクセレント！';
    feedback.push('🏆 完璧な地域課題解決プランです！');
  } else if (totalScore >= 150) {
    evaluation = 'A評価：素晴らしい！';
    feedback.push('⭐ 実現可能性の高いプランです！');
  } else if (totalScore >= 100) {
    evaluation = 'B評価：良好';
    feedback.push('👍 良いアイデアですが、改善の余地があります');
  } else {
    evaluation = 'C評価：要改善';
    feedback.push('💡 もう少し戦略を練り直してみましょう');
  }
  
  return {
    totalScore,
    breakdown: {
      problemScore,
      solutionScore,
      synergyBonus,
    },
    evaluation,
    feedback,
  };
}
