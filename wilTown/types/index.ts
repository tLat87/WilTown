export interface Story {
  id: string;
  title: string;
  subtitle: string;
  unlocked: boolean;
  quote?: string;
}

export interface DisputeLevel {
  id: string;
  number: number;
  title: string;
  unlocked: boolean;
}

export interface Dispute {
  id: string;
  levelId: string;
  text: string;
  choices: { id: string; text: string }[];
  correctChoice: number;
}

export interface Resources {
  stone: number;
  wood: number;
}

export interface GameState {
  resources: Resources;
  unlockedStories: string[];
  completedLevels: string[];
  currentLevel?: string;
  storyViewTimes: Record<string, number>; // buildingId -> timestamp последнего просмотра
  buildingStartTimes: Record<string, number>; // buildingId -> timestamp начала строительства
}

