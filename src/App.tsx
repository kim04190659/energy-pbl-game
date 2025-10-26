import { useState, useEffect } from 'react';
import { GameBoard } from './components/game/GameBoard';
import { LoadingScreen } from './components/game/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return <GameBoard />;
}

export default App;
