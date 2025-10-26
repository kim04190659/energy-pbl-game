export type CardType = 'persona' | 'problem' | 'partner' | 'job';

export interface CardData {
  id: string;
  type: CardType;
  title: string;
  description: string;
  score?: number;
  category?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface Player {
  id: string;
  name: string;
  role: string;
  hand: CardData[];
}

export type GamePhase = 'setup' | 'problem-selection' | 'solution-building' | 'result';
