import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import { disputeLevels } from '../data/gameData';
import { MAIN_BACKGROUND } from '../config/backgrounds';
import { FONT_FAMILY } from '../constants/fonts';

type TownDisputesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TownDisputes'>;
};

const TownDisputesScreen: React.FC<TownDisputesScreenProps> = ({ navigation }) => {
  const { gameState } = useGame();

  const isUnlocked = (levelId: string) => {
    if (levelId === 'ranch-disputes') return true;
    const levelIndex = disputeLevels.findIndex(l => l.id === levelId);
    if (levelIndex === 0) return true;
    const previousLevel = disputeLevels[levelIndex - 1];
    return gameState.completedLevels.includes(previousLevel.id);
  };

  const handleLevelPress = (levelId: string) => {
    if (isUnlocked(levelId)) {
      navigation.navigate('DisputeGameplay', { levelId });
    }
  };

  return (
    <ImageBackground
      source={MAIN_BACKGROUND}
      style={styles.background}
      resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Town Disputes</Text>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {disputeLevels.map((level) => {
            const unlocked = isUnlocked(level.id);
            return (
              <TouchableOpacity
                key={level.id}
                style={styles.levelRow}
                onPress={() => handleLevelPress(level.id)}
                disabled={!unlocked}>
                <View
                  style={[
                    styles.numberButton,
                    level.number === 1 && styles.numberButtonActive,
                  ]}>
                  <Text style={styles.numberText}>{level.number}</Text>
                </View>
                <View style={styles.titleButton}>
                  <Text style={styles.titleText}>{level.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B8E23',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#556B2F',
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#D4AF37',
    textShadowColor: '#8B6914',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 15,
  },
  levelRow: {
    flexDirection: 'row',
    gap: 10,
  },
  numberButton: {
    width: 60,
    height: 60,
    backgroundColor: '#8B4513',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#654321',
  },
  numberButtonActive: {
    backgroundColor: '#FF8C00',
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#FFF',
  },
  titleButton: {
    flex: 1,
    backgroundColor: '#8B4513',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#654321',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#FFF',
  },
});

export default TownDisputesScreen;

