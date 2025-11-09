import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { MAIN_BACKGROUND } from '../config/backgrounds';
import { FONT_FAMILY } from '../constants/fonts';

type LevelCompleteScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'LevelComplete'>;
  route: RouteProp<RootStackParamList, 'LevelComplete'>;
};

const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <ImageBackground
      source={MAIN_BACKGROUND}
      style={styles.background}
      resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.titleSign}>
            <Text style={styles.titleText}>LEVEL DONE</Text>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>
              You handled the disputes like a true frontier mediator. The town
              stands stronger thanks to your wisdom.
            </Text>
          </View>
        </View>

        <View style={styles.rewardsContainer}>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardIcon}>🪨</Text>
            <Text style={styles.rewardText}>+4</Text>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardIcon}>🪵</Text>
            <Text style={styles.rewardText}>+6</Text>
          </View>
        </View>

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={styles.navButton}>
            <Text style={styles.navIcon}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('TownDisputes')}
            activeOpacity={0.8}
            style={[styles.nextButton, { alignSelf: 'center' }]}>
            <Text style={styles.nextButtonText}>Next Level</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainMenu')}
            activeOpacity={0.8}
            style={styles.navButton}>
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 30,
  },
  titleSign: {
    backgroundColor: '#8B4513',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#654321',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#D4AF37',
    textShadowColor: '#8B6914',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  messageContainer: {
    width: '100%',
    marginBottom: 30,
  },
  messageBox: {
    backgroundColor: '#DEB887',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#CD853F',
  },
  messageText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    color: '#654321',
    textAlign: 'center',
    lineHeight: 24,
  },
  rewardsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rewardIcon: {
    fontSize: 32,
    fontFamily: FONT_FAMILY,
  },
  rewardText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#654321',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    width: '100%',
    justifyContent: 'center',
  },
  navButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#654321',
  },
  navIcon: {
    fontSize: 24,
    fontFamily: FONT_FAMILY,
  },
  nextButton: {
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
  nextButtonText: {
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

export default LevelCompleteScreen;

