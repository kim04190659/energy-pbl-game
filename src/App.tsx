import { useState } from 'react';
import { GameBoard } from './components/game/GameBoard';
import { LoadingScreen } from './components/game/LoadingScreen';
import { ThemeSelector } from './components/game/ThemeSelector';
import { GameConfig } from './types/game-config.types';
import { municipalityConfig } from './configs/municipality.config';
import { energyConfig } from './configs/energy.config';

const availableThemes = [municipalityConfig, energyConfig];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<GameConfig | null>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleSelectTheme = (theme: GameConfig) => {
    setSelectedTheme(theme);
    // TODO: GameBoardにconfigを渡す実装は次のステップ
    // 今は選択したらGameBoardを表示
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (!selectedTheme) {
    return <ThemeSelector themes={availableThemes} onSelectTheme={handleSelectTheme} />;
  }

  // 既存のGameBoardをそのまま使用（configは次のステップで統合）
  return <GameBoard />;
}

export default App;
