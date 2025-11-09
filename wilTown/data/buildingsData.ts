export interface Building {
  id: string;
  title: string;
  cost: {
    stone: number;
    wood: number;
  };
  position: {
    top: number;
    left: number;
  };
  quote: string;
}

export const buildings: Building[] = [
  {
    id: 'settlers-house',
    title: "Settler's House",
    cost: { stone: 0, wood: 0 },
    position: { top: 20, left: 15 },
    quote: "This town's shaping up real fine, partner.",
  },
  {
    id: 'doctors-hut',
    title: "Doctor's Hut",
    cost: { stone: 4, wood: 6 },
    position: { top: 25, left: 50 },
    quote: "Every nail and plank's a step toward a better frontier.",
  },
  {
    id: 'saloon',
    title: 'Saloon',
    cost: { stone: 8, wood: 10 },
    position: { top: 50, left: 20 },
    quote: "Looks like the dust is turning into a home.",
  },
  {
    id: 'blacksmith-forge',
    title: "Blacksmith's Forge",
    cost: { stone: 6, wood: 8 },
    position: { top: 55, left: 65 },
    quote: "One more building, one less worry for our folks.",
  },
  {
    id: 'sheriff-office',
    title: "Sheriff's Office",
    cost: { stone: 10, wood: 12 },
    position: { top: 75, left: 40 },
    quote: "These lots are still quiet... need more wood and stone before life moves in.",
  },
];

