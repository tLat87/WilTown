import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
  Modal,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import { stories } from '../data/gameData';
import { MAIN_BACKGROUND } from '../config/backgrounds';
import { FONT_FAMILY } from '../constants/fonts';

const { width } = Dimensions.get('window');

type StoriesScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Stories'>;
};

const StoriesScreen: React.FC<StoriesScreenProps> = ({ navigation }) => {
  const { gameState } = useGame();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [currentStoryTitle, setCurrentStoryTitle] = useState<string>('');
  const [currentStorySubtitle, setCurrentStorySubtitle] = useState<string>('');

  const isUnlocked = (storyId: string) => {
    return gameState.unlockedStories.includes(storyId);
  };

  const handleOpenStory = (storyId: string) => {
    const story = stories.find(s => s.id === storyId);
    if (story && story.quote) {
      setCurrentStoryTitle(story.title);
      setCurrentStorySubtitle(story.subtitle);
      setCurrentQuote(story.quote);
      setShowQuoteModal(true);
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
          <Text style={styles.headerTitle}>Stories</Text>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {stories.map((story) => {
            const unlocked = isUnlocked(story.id);
            return (
              <View key={story.id} style={styles.storyCard}>
                <Text style={styles.storyCardTitle}>
                  {story.title} — '{story.subtitle}'
                </Text>
                {unlocked ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.openButton, { alignSelf: 'center' }]}
                    onPress={() => handleOpenStory(story.id)}>
                    <Text style={styles.openButtonText}>Open</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.lockedContainer}>
                    <Text style={styles.lockIcon}>🔒</Text>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Story Quote Modal */}
      <Modal
        visible={showQuoteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQuoteModal(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowQuoteModal(false)}>
          <View style={styles.quoteModalContainer}>
            <View style={styles.quoteModalContent}>
              <Text style={styles.storyTitle}>
                {currentStoryTitle} — '{currentStorySubtitle}'
              </Text>
              <View style={styles.storyQuoteBox}>
                <Text style={styles.storyQuoteText}>{currentQuote}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setShowQuoteModal(false);
                  setCurrentStoryTitle('');
                  setCurrentStorySubtitle('');
                  setCurrentQuote('');
                }}
                style={styles.quoteCloseButton}>
                <Text style={styles.quoteCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  storyCard: {
    backgroundColor: '#DEB887',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#CD853F',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  storyCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#654321',
    marginBottom: 15,
  },
  openButton: {
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
  openButtonText: {
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
  lockedContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  lockIcon: {
    fontSize: 24,
    fontFamily: FONT_FAMILY,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteModalContainer: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  quoteModalContent: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#D4AF37',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#8B6914',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  storyQuoteBox: {
    backgroundColor: '#8B4513',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#654321',
    minWidth: width * 0.8,
    maxWidth: width * 0.9,
  },
  storyQuoteText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    color: '#DEB887',
    lineHeight: 24,
    textAlign: 'left',
  },
  quoteCloseButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 30,
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
  quoteCloseButtonText: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: '#654321',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default StoriesScreen;

