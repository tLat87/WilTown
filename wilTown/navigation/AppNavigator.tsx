import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import OnboardingScreen from '../screens/OnboardingScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import StoriesScreen from '../screens/StoriesScreen';
import TownDisputesScreen from '../screens/TownDisputesScreen';
import DisputeGameplayScreen from '../screens/DisputeGameplayScreen';
import LevelCompleteScreen from '../screens/LevelCompleteScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import MyTownScreen from '../screens/MyTownScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="Stories" component={StoriesScreen} />
        <Stack.Screen name="TownDisputes" component={TownDisputesScreen} />
        <Stack.Screen name="DisputeGameplay" component={DisputeGameplayScreen} />
        <Stack.Screen name="LevelComplete" component={LevelCompleteScreen} />
        <Stack.Screen name="Resources" component={ResourcesScreen} />
        <Stack.Screen name="MyTown" component={MyTownScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

