import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { onboardingScreens, OnboardingScreen } from '../data/onboardingData';
import { FONT_FAMILY } from '../constants/fonts';

const { width, height } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreenComponent: React.FC<OnboardingScreenProps> = ({
  navigation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentScreen = onboardingScreens[currentIndex];

  const handleNext = () => {
    if (currentIndex < onboardingScreens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Завершение онбординга - переход в главное меню
      navigation.replace('MainMenu');
    }
  };

  const handleSkip = () => {
    navigation.replace('MainMenu');
  };

  return (
    <ImageBackground
      source={currentScreen.backgroundImage}
      style={styles.background}
      resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Character Image */}
        <View style={styles.characterContainer}>
          <Image
            source={currentScreen.characterImage}
            style={styles.character}
            resizeMode="contain"
          />
        </View>

        {/* Text Box */}
        <View style={styles.textContainer}>
          <View style={styles.textBox}>
            <Text style={styles.title}>{currentScreen.title}</Text>
            <Text style={styles.description}>{currentScreen.description}</Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={styles.button}>
            <Text style={styles.buttonText}>{currentScreen.buttonText}</Text>
          </TouchableOpacity>

          {/* Dots Indicator */}
          <View style={styles.dotsContainer}>
            {onboardingScreens.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex && styles.dotActive,
                ]}
              />
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
    paddingBottom: 40,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 20,
  },
  skipText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONT_FAMILY,
  },
  characterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  character: {
    width: width * 0.6,
    height: height * 0.4,
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  textBox: {
    backgroundColor: '#8B4513',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#654321',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#D4AF37',
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: '#8B6914',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
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
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
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
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8B4513',
    opacity: 0.5,
  },
  dotActive: {
    backgroundColor: '#D4AF37',
    opacity: 1,
    width: 24,
  },
});

export default OnboardingScreenComponent;

