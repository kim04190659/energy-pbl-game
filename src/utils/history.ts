export interface PlayHistory {
  id: string;
  timestamp: number;
  score: number;
  evaluation: string;
  persona: string;
  problem: string;
  partners: string[];
  jobs: string[];
}

export class HistoryManager {
  private static STORAGE_KEY = 'pbl_game_history';
  private static MAX_HISTORY = 20;

  static savePlay(history: Omit<PlayHistory, 'id' | 'timestamp'>): void {
    const plays = this.getHistory();
    const newPlay: PlayHistory = {
      ...history,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    plays.unshift(newPlay);
    
    // 最大件数を超えたら古いものを削除
    if (plays.length > this.MAX_HISTORY) {
      plays.splice(this.MAX_HISTORY);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(plays));
  }

  static getHistory(): PlayHistory[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  static getStats() {
    const history = this.getHistory();
    if (history.length === 0) {
      return {
        totalPlays: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        recentPlays: [],
      };
    }

    const scores = history.map(h => h.score);
    const totalPlays = history.length;
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalPlays);
    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);
    const recentPlays = history.slice(0, 5);

    return {
      totalPlays,
      averageScore,
      highestScore,
      lowestScore,
      recentPlays,
    };
  }

  static clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
