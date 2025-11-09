export interface OnboardingScreen {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  backgroundImage: any; // Путь к фоновому изображению
  characterImage: any; // Путь к изображению ковбоя
}

export const onboardingScreens: OnboardingScreen[] = [
  {
    id: 1,
    title: 'Welcome to the Frontier',
    description:
      'Start your new life in the Wild West. Build, explore, and turn this dusty land into a thriving town.',
    buttonText: 'RIDE ON',
    backgroundImage: require('../assets/onboarding/bg-1.png'), // Замените на ваш путь
    characterImage: require('../assets/onboarding/cowboy-1.png'), // Замените на ваш путь
  },
  {
    id: 2,
    title: 'Be the Mediator',
    description:
      'Solve disputes peacefully and earn wood and stone to build new homes for your growing town.',
    buttonText: 'Got It',
    backgroundImage: require('../assets/onboarding/bg-2.png'), // Замените на ваш путь
    characterImage: require('../assets/onboarding/cowboy-2.png'), // Замените на ваш путь
  },
  {
    id: 3,
    title: 'Grow Your Town',
    description:
      'Each building brings new stories, people, and challenges. The frontier is yours to shape.',
    buttonText: 'Start Building',
    backgroundImage: require('../assets/onboarding/bg-3.png'), // Замените на ваш путь
    characterImage: require('../assets/onboarding/cowboy-3.png'), // Замените на ваш путь
  },
];

