import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import { disputes } from '../data/gameData';
import { MAIN_BACKGROUND } from '../config/backgrounds';
import { FONT_FAMILY } from '../constants/fonts';

type DisputeGameplayScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'DisputeGameplay'>;
  route: RouteProp<RootStackParamList, 'DisputeGameplay'>;
};

const DisputeGameplayScreen: React.FC<DisputeGameplayScreenProps> = ({
  navigation,
  route,
}) => {
  const { levelId } = route.params;
  const { updateResources, completeLevel, setCurrentLevel } = useGame();
  const [currentDisputeIndex, setCurrentDisputeIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const levelDisputes = disputes.filter(d => d.levelId === levelId);

  useEffect(() => {
    setCurrentLevel(levelId);
  }, [levelId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDisputeIndex]);

  const handleChoice = (choiceIndex: number) => {
    if (selectedChoice !== null) return;
    setSelectedChoice(choiceIndex);

    setTimeout(() => {
      if (currentDisputeIndex < levelDisputes.length - 1) {
        setCurrentDisputeIndex(prev => prev + 1);
        setSelectedChoice(null);
      } else {
        // Level completed
        completeLevel(levelId);
        updateResources(4, 6);
        navigation.replace('LevelComplete', { levelId });
      }
    }, 1500);
  };

  // Reset timer when dispute index changes
  useEffect(() => {
    setTimeLeft(60);
  }, [currentDisputeIndex]);

  const currentDispute = levelDisputes[currentDisputeIndex];

  if (!currentDispute) {
    return null;
  }

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
          <Text style={styles.headerTitle}>Ranch Disputes</Text>
        </View>

          <View style={styles.timerContainer}>
            <View style={styles.timerButton}>
              <Text style={styles.timerText}>{timeLeft}</Text>
            </View>
          </View>

        <View style={styles.characterContainer}>
          <View style={styles.characterPlaceholder}>
            <Image source={require('../assets/onboarding/cowboy-1.png')} style={{width: 250, height: 350}} resizeMode='contain' />
          </View>
        </View>

          <View style={styles.disputeContainer}>
            <View style={styles.disputeBox}>
              <Text style={styles.disputeText}>{currentDispute.text}</Text>
            </View>

          <View style={styles.choicesContainer}>
            {currentDispute.choices.map((choice, index) => (
              <TouchableOpacity
                key={choice.id}
                onPress={() => handleChoice(index)}
                disabled={selectedChoice !== null}
                activeOpacity={0.8}
                style={[
                  styles.choiceButton,
                  selectedChoice === index && styles.choiceButtonSelected,
                  { alignSelf: 'center' },
                ]}>
                <Text style={styles.choiceText}>{choice.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
  timerContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  timerButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#654321',
  },
  timerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
  },
  characterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  characterPlaceholder: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterEmoji: {
    fontSize: 100,
    fontFamily: FONT_FAMILY,
  },
  disputeContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  disputeBox: {
    backgroundColor: '#DEB887',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#CD853F',
  },
  disputeText: {
    fontSize: 18,
    color: '#654321',
    fontWeight: '600',
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
  },
  choicesContainer: {
    gap: 15,
    alignItems: 'center',
  },
  choiceButton: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#8B4513',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#654321',
    borderBottomWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  choiceButtonSelected: {
    opacity: 0.8,
    borderColor: '#654321',
  },
  choiceText: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: '#654321',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default DisputeGameplayScreen;

