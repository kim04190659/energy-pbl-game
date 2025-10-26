import { useState, useEffect } from 'react';
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
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (!selectedTheme) {
    return <ThemeSelector themes={availableThemes} onSelectTheme={handleSelectTheme} />;
  }

  return <GameBoard config={selectedTheme} />;
}

export default App;
