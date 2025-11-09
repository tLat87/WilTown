import { Story, DisputeLevel, Dispute } from '../types';

export const stories: Story[] = [
  {
    id: 'settlers-house',
    title: "Settler's House",
    subtitle: "The Lone Start",
    unlocked: true,
    quote: "He came with nothing but a horse, a rope, and\na promise — to turn dust into home.\nEach nail in the wall marked a day he refused\nto quit.\nNow, when the sun hits his porch, it's not just\nlight — it's proof he made it.",
  },
  {
    id: 'doctors-hut',
    title: "Doctor's Hut",
    subtitle: "Nora's Oath",
    unlocked: false,
    quote: "She arrived with a bag full of herbs and a heart\nfull of hope. In a land where death came easy,\nshe chose to fight for every breath.\nHer hands, steady as stone, mended wounds\nthat words couldn't heal.\nThe frontier needed a healer, and she became\nits guardian angel.",
  },
  {
    id: 'saloon',
    title: 'Saloon',
    subtitle: 'Whiskey and Wisdom',
    unlocked: false,
    quote: "Where whiskey flows and stories grow,\nstrangers become neighbors, and neighbors\nbecome family.\nIn the dim light, deals are made, friendships\nforged, and the weight of the frontier lifts\nfor just a moment.\nThis isn't just a bar — it's the heart of the town.",
  },
  {
    id: 'blacksmith-forge',
    title: "Blacksmith's Forge",
    subtitle: 'Iron Will',
    unlocked: false,
    quote: "Fire and steel, sweat and determination.\nEvery hammer strike shapes not just metal,\nbut the future of this town.\nHis forge burns day and night, a beacon of\nprogress in the wilderness.\nWhere there's iron, there's hope.",
  },
  {
    id: 'sheriff-office',
    title: "Sheriff's Office",
    subtitle: "Law of the Dust",
    unlocked: false,
    quote: "In a land where law was just a word,\nhe made it real. With a badge and a steady hand,\nhe brought order to chaos.\nJustice wasn't just his job — it was his promise\nto every soul who called this place home.\nThe frontier needed a lawman, and he answered.",
  },
];

export const disputeLevels: DisputeLevel[] = [
  {
    id: 'ranch-disputes',
    number: 1,
    title: 'Ranch Disputes',
    unlocked: true,
  },
  {
    id: 'town-affairs',
    number: 2,
    title: 'Town Affairs',
    unlocked: false,
  },
  {
    id: 'frontier-cooperation',
    number: 3,
    title: 'Frontier Cooperation',
    unlocked: false,
  },
  {
    id: 'moral-compass',
    number: 4,
    title: 'Moral Compass',
    unlocked: false,
  },
  {
    id: 'town-rising',
    number: 5,
    title: 'Town Rising',
    unlocked: false,
  },
];

export const disputes: Dispute[] = [
  {
    id: 'dispute-1-1',
    levelId: 'ranch-disputes',
    text: "Two ranchers want to hire the same worker.",
    choices: [
      { id: 'choice-1', text: "Let them fight it out." },
      { id: 'choice-2', text: "Ask the worker who he prefers to help first." },
    ],
    correctChoice: 1,
  },
  {
    id: 'dispute-1-2',
    levelId: 'ranch-disputes',
    text: "A farmer refuses to help during a storm.",
    choices: [
      { id: 'choice-1', text: "Remind him that next time he might need help too." },
      { id: 'choice-2', text: "Leave him be; it's his problem." },
    ],
    correctChoice: 0,
  },
  {
    id: 'dispute-1-3',
    levelId: 'ranch-disputes',
    text: "Two families claim the same piece of land.",
    choices: [
      { id: 'choice-1', text: "Split the land equally between them." },
      { id: 'choice-2', text: "Let the first settler keep it." },
    ],
    correctChoice: 0,
  },
];

