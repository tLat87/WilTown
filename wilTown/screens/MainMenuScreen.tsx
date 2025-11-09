import React from 'react';
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
import { RootStackParamList } from '../navigation/types';
import { MAIN_BACKGROUND } from '../config/backgrounds';
import { FONT_FAMILY } from '../constants/fonts';

type MainMenuScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;
};

const MainMenuScreen: React.FC<MainMenuScreenProps> = ({ navigation }) => {
  return (
    <ImageBackground
      source={MAIN_BACKGROUND}
      style={styles.background}
      resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
         <Image source={require('../assets/f98f9daf3e0b268a5c34d97d302a773f0eb6d3c2.png')} style={{width: 300, height: 200}} resizeMode='stretch' />
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TownDisputes')}
            style={styles.menuButton}
            activeOpacity={0.8}>
            <Text style={styles.menuButtonText}>FRONTIER TALKS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyTown')}
            style={styles.menuButton}
            activeOpacity={0.8}>
            <Text style={styles.menuButtonText}>MY TOWN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Stories')}
            style={styles.menuButton}
            activeOpacity={0.8}>
            <Text style={styles.menuButtonText}>STORIES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Resources')}
            style={styles.menuButton}
            activeOpacity={0.8}>
            <Text style={styles.menuButtonText}>RESOURCES</Text>
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
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  titleLine1: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#D4AF37',
    textShadowColor: '#8B6914',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  titleLine2: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#D4AF37',
    textShadowColor: '#8B6914',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  titleSignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    // paddingHorizontal: 30,
    width: 200,
    height: 50,
    justifyContent: 'center',
    // paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#654321',
    marginTop: 10,
  },
  star: {
    fontSize: 24,
    marginRight: 10,
    fontFamily: FONT_FAMILY,
  },
  titleLine3: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#D4AF37',
    textShadowColor: '#8B6914',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 2,
  },
  menuContainer: {
    width: '80%',
    gap: 20,
    alignItems: 'center',
  },
  menuButton: {
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
  menuButtonText: {
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

export default MainMenuScreen;

