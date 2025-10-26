import { CardData } from './card.types';

export interface GameConfig {
  id: string;
  name: string;
  description: string;
  theme: {
    title: string;
    subtitle: string;
    icon: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  cards: {
    personas: CardData[];
    problems: CardData[];
    partners: CardData[];
    jobs: CardData[];
  };
  scoring: {
    synergyRules: SynergyRule[];
    evaluationThresholds: {
      S: number;
      A: number;
      B: number;
      C: number;
    };
  };
  ui: {
    showTutorial: boolean;
    maxCardsPerType?: number;
    allowMultipleSelection: boolean;
  };
}

export interface SynergyRule {
  id: string;
  name: string;
  description: string;
  bonus: number;
  condition: (selection: {
    persona?: CardData;
    problem?: CardData;
    partners: CardData[];
    jobs: CardData[];
  }) => boolean;
}
