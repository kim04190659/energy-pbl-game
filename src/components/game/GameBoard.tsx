import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ResultScreen } from './ResultScreen';
import { Tutorial } from './Tutorial';
import { getCardsByType } from '../../data/municipality-cards';
import { CardData } from '../../types/card.types';
import { calculateScore, GameResult } from '../../utils/scoring';
import { soundManager } from '../../utils/sounds';

type GamePhase = 'select-persona' | 'select-problem' | 'select-solution' | 'result';

export const GameBoard: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('select-persona');
  const [selectedPersona, setSelectedPersona] = useState<CardData | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<CardData | null>(null);
  const [selectedPartners, setSelectedPartners] = useState<CardData[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<CardData[]>([]);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  const personaCards = getCardsByType('persona');
  const problemCards = getCardsByType('problem');
  const partnerCards = getCardsByType('partner');
  const jobCards = getCardsByType('job');

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenTutorial');
    if (!seen) {
      setShowTutorial(true);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const handleTutorialNext = () => {
    if (tutorialStep < 4) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
      setHasSeenTutorial(true);
      localStorage.setItem('hasSeenTutorial', 'true');
    }
  };

  const handleTutorialSkip = () => {
    setShowTutorial(false);
    setHasSeenTutorial(true);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const handleCardClick = (card: CardData) => {
    if (currentPhase === 'select-persona') {
      setSelectedPersona(card);
    } else if (currentPhase === 'select-problem') {
      setSelectedProblem(card);
    } else if (currentPhase === 'select-solution') {
      if (card.type === 'partner') {
        setSelectedPartners(prev => 
          prev.some(c => c.id === card.id)
            ? prev.filter(c => c.id !== card.id)
            : [...prev, card]
        );
      } else if (card.type === 'job') {
        setSelectedJobs(prev =>
          prev.some(c => c.id === card.id)
            ? prev.filter(c => c.id !== card.id)
            : [...prev, card]
        );
      }
    }
  };

  const isCardSelected = (card: CardData): boolean => {
    if (currentPhase === 'select-persona') {
      return selectedPersona?.id === card.id;
    } else if (currentPhase === 'select-problem') {
      return selectedProblem?.id === card.id;
    } else if (currentPhase === 'select-solution') {
      return [...selectedPartners, ...selectedJobs].some(c => c.id === card.id);
    }
    return false;
  };

  const getPhaseTitle = () => {
    switch (currentPhase) {
      case 'select-persona':
        return '🎭 ステップ1: あなたの役割を選んでください';
      case 'select-problem':
        return '⚠️ ステップ2: 解決したい課題を選んでください';
      case 'select-solution':
        return '💡 ステップ3: ソリューションを組み立てましょう';
      default:
        return '';
    }
  };

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case 'select-persona':
        return 'まず、あなたの立場を選びます。市長、住民、NPO、企業のどれになりますか？';
      case 'select-problem':
        return '次に、この地域が抱える課題を選びます。最も重要な問題は何でしょうか？';
      case 'select-solution':
        return '最後に、課題を解決するためのパートナーと施策を選びましょう！（複数選択可）';
      default:
        return '';
    }
  };

  const getCurrentCards = () => {
    switch (currentPhase) {
      case 'select-persona':
        return personaCards;
      case 'select-problem':
        return problemCards;
      case 'select-solution':
        return [...partnerCards, ...jobCards];
      default:
        return [];
    }
  };

  const getSelectedCount = () => {
    if (currentPhase === 'select-solution') {
      return selectedPartners.length + selectedJobs.length;
    }
    return selectedPersona || selectedProblem ? 1 : 0;
  };

  const canProceed = () => {
    if (currentPhase === 'select-persona') return selectedPersona !== null;
    if (currentPhase === 'select-problem') return selectedProblem !== null;
    if (currentPhase === 'select-solution') return selectedPartners.length > 0 || selectedJobs.length > 0;
    return false;
  };

  const handleNextPhase = () => {
    soundManager.playNextPhase();
    
    if (currentPhase === 'select-persona') {
      setCurrentPhase('select-problem');
    } else if (currentPhase === 'select-problem') {
      setCurrentPhase('select-solution');
    } else if (currentPhase === 'select-solution') {
      const result = calculateScore(
        selectedPersona,
        selectedProblem,
        selectedPartners,
        selectedJobs
      );
      setGameResult(result);
      setCurrentPhase('result');
    }
  };

  const handleReset = () => {
    setCurrentPhase('select-persona');
    setSelectedPersona(null);
    setSelectedProblem(null);
    setSelectedPartners([]);
    setSelectedJobs([]);
    setGameResult(null);
  };

  if (currentPhase === 'result' && gameResult) {
    return (
      <ResultScreen
        result={gameResult}
        selectedCards={{
          persona: selectedPersona,
          problem: selectedProblem,
          partners: selectedPartners,
          jobs: selectedJobs,
        }}
        onRestart={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
      {showTutorial && (
        <Tutorial
          step={tutorialStep}
          totalSteps={5}
          onNext={handleTutorialNext}
          onSkip={handleTutorialSkip}
        />
      )}

      <div className="max-w-7xl mx-auto mb-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🏙️ スマートシティ PBL カードゲーム
        </motion.h1>
        <motion.p 
          className="text-white/80 text-center text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          地域課題を解決するための最適なチームを組み立てよう
        </motion.p>
        
        {hasSeenTutorial && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                setShowTutorial(true);
                setTutorialStep(0);
              }}
              className="text-white/60 hover:text-white text-sm underline transition-colors"
            >
              ❓ チュートリアルをもう一度見る
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mb-8">
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            {getPhaseTitle()}
          </h2>
          <p className="text-white/70 text-center mb-4">
            {getPhaseDescription()}
          </p>
          
          {getSelectedCount() > 0 && (
            <div className="mt-4 p-4 bg-green-500/20 rounded-xl border border-green-500/30">
              <p className="text-white font-semibold text-center">
                ✅ {getSelectedCount()}個選択中
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className={`w-24 h-2 rounded-full transition-all ${
            currentPhase === 'select-persona' || currentPhase === 'select-problem' || currentPhase === 'select-solution' 
              ? 'bg-green-500' : 'bg-white/20'
          }`} />
          <div className={`w-24 h-2 rounded-full transition-all ${
            currentPhase === 'select-problem' || currentPhase === 'select-solution' 
              ? 'bg-green-500' : 'bg-white/20'
          }`} />
          <div className={`w-24 h-2 rounded-full transition-all ${
            currentPhase === 'select-solution' ? 'bg-green-500' : 'bg-white/20'
          }`} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {getCurrentCards().map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
              isSelected={isCardSelected(card)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex justify-center gap-4 flex-wrap">
        <motion.button
          onClick={handleNextPhase}
          disabled={!canProceed()}
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all disabled:cursor-not-allowed text-lg"
          whileHover={canProceed() ? { scale: 1.05 } : {}}
          whileTap={canProceed() ? { scale: 0.95 } : {}}
        >
          {currentPhase === 'select-solution' ? '結果を見る 🎯' : '次へ進む →'}
        </motion.button>
        
        <motion.button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          最初からやり直す
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 inline-block">
          <p className="text-white/60 text-sm">
            Created by 木村好孝 | Week 1-2 Complete Version
          </p>
        </div>
      </div>
    </div>
  );
};
