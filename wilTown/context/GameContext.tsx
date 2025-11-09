import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GameState, Resources, Dispute } from '../types';

interface GameContextType {
  gameState: GameState;
  updateResources: (stone: number, wood: number) => void;
  unlockStory: (storyId: string) => void;
  completeLevel: (levelId: string) => void;
  setCurrentLevel: (levelId: string | undefined) => void;
  recordStoryView: (buildingId: string) => void;
  startBuilding: (buildingId: string) => void;
  completeBuilding: (buildingId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    resources: {
      stone: 32,
      wood: 19,
    },
    unlockedStories: ['settlers-house'],
    completedLevels: [],
    currentLevel: undefined,
    storyViewTimes: {},
    buildingStartTimes: {},
  });

  const updateResources = useCallback((stone: number, wood: number) => {
    setGameState(prev => ({
      ...prev,
      resources: {
        stone: prev.resources.stone + stone,
        wood: prev.resources.wood + wood,
      },
    }));
  }, []);

  const unlockStory = useCallback((storyId: string) => {
    setGameState(prev => ({
      ...prev,
      unlockedStories: [...prev.unlockedStories, storyId],
    }));
  }, []);

  const completeLevel = useCallback((levelId: string) => {
    setGameState(prev => ({
      ...prev,
      completedLevels: [...prev.completedLevels, levelId],
    }));
  }, []);

  const setCurrentLevel = useCallback((levelId: string | undefined) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: levelId,
    }));
  }, []);

  const recordStoryView = useCallback((buildingId: string) => {
    setGameState(prev => ({
      ...prev,
      storyViewTimes: {
        ...prev.storyViewTimes,
        [buildingId]: Date.now(),
      },
    }));
  }, []);

  const startBuilding = useCallback((buildingId: string) => {
    setGameState(prev => ({
      ...prev,
      buildingStartTimes: {
        ...prev.buildingStartTimes,
        [buildingId]: Date.now(),
      },
    }));
  }, []);

  const completeBuilding = useCallback((buildingId: string) => {
    setGameState(prev => {
      const newBuildingStartTimes = { ...prev.buildingStartTimes };
      delete newBuildingStartTimes[buildingId];
      
      return {
        ...prev,
        unlockedStories: [...prev.unlockedStories, buildingId],
        buildingStartTimes: newBuildingStartTimes,
      };
    });
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        updateResources,
        unlockStory,
        completeLevel,
        setCurrentLevel,
        recordStoryView,
        startBuilding,
        completeBuilding,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

