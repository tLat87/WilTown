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
import { MAIN_BACKGROUND } from '../config/backgrounds';
import { FONT_FAMILY } from '../constants/fonts';

type ResourcesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Resources'>;
};

const ResourcesScreen: React.FC<ResourcesScreenProps> = ({ navigation }) => {
  const { gameState } = useGame();

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
          <Text style={styles.headerTitle}>Resources</Text>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.infoContainer}>
            <View style={styles.infoPanel}>
              <Text style={styles.infoTitle}>HOW TO BUILD?</Text>
              <Text style={styles.infoText}>
                Select a building and start construction. Each building takes 30 minutes to complete.
              </Text>
            </View>

            <View style={styles.infoPanel}>
              <Text style={styles.infoTitle}>BUILDING PROGRESS</Text>
              <Text style={styles.infoText}>
                Check your town to see building progress and completion times.
              </Text>
            </View>

            <View style={styles.infoPanel}>
              <Text style={styles.infoTitle}>STORY ACCESS</Text>
              <Text style={styles.infoText}>
                Once built, you can read each building's story once per day.
              </Text>
            </View>
          </View>
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
    gap: 20,
  },
  resourcesDisplay: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
  },
  resourcePanel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DEB887',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CD853F',
    gap: 10,
  },
  resourceIcon: {
    fontSize: 32,
    fontFamily: FONT_FAMILY,
  },
  resourceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#654321',
  },
  infoContainer: {
    gap: 15,
  },
  infoPanel: {
    backgroundColor: '#6B8E23',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#556B2F',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#D4AF37',
    marginBottom: 10,
    letterSpacing: 1,
  },
  infoText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    color: '#FFF',
    lineHeight: 22,
  },
});

export default ResourcesScreen;

