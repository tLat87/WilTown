import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useGame } from '../context/GameContext';
import { MAIN_BACKGROUND } from '../config/backgrounds';
import { FONT_FAMILY } from '../constants/fonts';
import { buildings } from '../data/buildingsData';
import { stories } from '../data/gameData';

const { width, height } = Dimensions.get('window');

type MyTownScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MyTown'>;
};

const MyTownScreen: React.FC<MyTownScreenProps> = ({ navigation }) => {
  const { gameState, updateResources, unlockStory, recordStoryView, startBuilding, completeBuilding } = useGame();
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<string>('');
  const [currentStoryTitle, setCurrentStoryTitle] = useState<string>('');
  const [currentStorySubtitle, setCurrentStorySubtitle] = useState<string>('');
  const [buildingTimers, setBuildingTimers] = useState<Record<string, number>>({});

  const isBuildingUnlocked = (buildingId: string) => {
    return gameState.unlockedStories.includes(buildingId);
  };

  const isBuildingInProgress = (buildingId: string) => {
    return buildingId in gameState.buildingStartTimes;
  };

  const getBuildingProgress = (buildingId: string) => {
    const startTime = gameState.buildingStartTimes[buildingId];
    if (!startTime) return null;

    const now = Date.now();
    const elapsed = now - startTime;
    const thirtyMinutesInMs = 30 * 60 * 1000; // 30 минут

    if (elapsed >= thirtyMinutesInMs) {
      return null; // Строительство завершено (обрабатывается в useEffect)
    }

    const remaining = thirtyMinutesInMs - elapsed;
    const minutes = Math.floor(remaining / (60 * 1000));
    const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
    return { minutes, seconds, remaining };
  };

  // Обновление таймеров строительства
  useEffect(() => {
    const interval = setInterval(() => {
      const timers: Record<string, number> = {};
      buildings.forEach(building => {
        if (building.id in gameState.buildingStartTimes) {
          const startTime = gameState.buildingStartTimes[building.id];
          if (startTime) {
            const now = Date.now();
            const elapsed = now - startTime;
            const thirtyMinutesInMs = 30 * 60 * 1000;

            if (elapsed >= thirtyMinutesInMs) {
              // Строительство завершено
              completeBuilding(building.id);
            } else {
              const remaining = thirtyMinutesInMs - elapsed;
              timers[building.id] = remaining;
            }
          }
        }
      });
      setBuildingTimers(timers);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.buildingStartTimes, completeBuilding]);

  const canAfford = (stone: number, wood: number) => {
    return gameState.resources.stone >= stone && gameState.resources.wood >= wood;
  };

  const canViewStory = (buildingId: string) => {
    const lastViewTime = gameState.storyViewTimes[buildingId];
    if (!lastViewTime) return true; // Никогда не просматривали

    const now = Date.now();
    const timeSinceLastView = now - lastViewTime;
    const oneDayInMs = 24 * 60 * 60 * 1000; // 24 часа

    // Проверяем: прошло ли 24 часа с последнего просмотра (раз в сутки)
    return timeSinceLastView >= oneDayInMs;
  };

  const getTimeUntilNextView = (buildingId: string) => {
    const lastViewTime = gameState.storyViewTimes[buildingId];
    if (!lastViewTime) return null;

    const now = Date.now();
    const timeSinceLastView = now - lastViewTime;
    const oneDayInMs = 24 * 60 * 60 * 1000;

    // Если прошло меньше 24 часов, показываем время до следующего дня
    if (timeSinceLastView < oneDayInMs) {
      const remaining = oneDayInMs - timeSinceLastView;
      const hours = Math.floor(remaining / (60 * 60 * 1000));
      const minutes = Math.ceil((remaining % (60 * 60 * 1000)) / (60 * 1000));
      if (hours > 0) {
        return `${hours}ч ${minutes}м`;
      }
      return `${minutes}м`;
    }

    return null;
  };

  const handleBuildingPress = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (!building) return;

    // Show quote modal
    setCurrentQuote(building.quote);
    setShowQuoteModal(true);
  };

  const handleBuildButtonPress = (buildingId: string) => {
    if (isBuildingUnlocked(buildingId)) {
      // Check if can view story
      if (canViewStory(buildingId)) {
        // Show story quote modal
        const story = stories.find(s => s.id === buildingId);
        if (story && story.quote) {
          setCurrentStoryTitle(story.title);
          setCurrentStorySubtitle(story.subtitle);
          setCurrentQuote(story.quote);
          setShowQuoteModal(true);
          // Record view time
          recordStoryView(buildingId);
        }
      }
      // If can't view, do nothing (house is on cooldown)
    } else {
      // Show build modal
      setSelectedBuilding(buildingId);
      setShowBuildModal(true);
    }
  };

  const handleBuild = () => {
    if (!selectedBuilding) return;
    const building = buildings.find(b => b.id === selectedBuilding);
    if (!building) return;

    // Start building - takes 30 minutes
    startBuilding(selectedBuilding);
    setShowBuildModal(false);
    setSelectedBuilding(null);
  };

  const handleCloseModal = () => {
    setShowBuildModal(false);
    setSelectedBuilding(null);
  };

  const selectedBuildingData = selectedBuilding
    ? buildings.find(b => b.id === selectedBuilding)
    : null;

  return (
    <ImageBackground
      source={MAIN_BACKGROUND}
      style={styles.background}
      resizeMode="cover">
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Town</Text>
        </View>

        {/* Game Area */}
        <View style={styles.gameArea}>
          {buildings.map((building) => {
            const unlocked = isBuildingUnlocked(building.id);
            const inProgress = isBuildingInProgress(building.id);
            const isSelected = selectedBuilding === building.id;
            const canView = unlocked ? canViewStory(building.id) : false;
            const timeUntilNext = unlocked ? getTimeUntilNextView(building.id) : null;
            const buildingProgress = inProgress ? getBuildingProgress(building.id) : null;

            return (
              <View
                key={building.id}
                style={[
                  styles.buildingContainer,
                  {
                    top: `${building.position.top}%`,
                    left: `${building.position.left}%`,
                  },
                ]}>
                {/* Building Icon */}
                <TouchableOpacity
                  onPress={() => handleBuildingPress(building.id)}
                  style={styles.buildingTouchable}>
                  <View style={styles.buildingIcon}>
                    {unlocked ? (
                      <Text style={styles.buildingEmoji}>🏠</Text>
                    ) : inProgress ? (
                      <Text style={styles.buildingEmoji}>🏗️</Text>
                    ) : (
                      <Text style={styles.buildingEmoji}>🏚️</Text>
                    )}
                    {!unlocked && !inProgress && <Text style={styles.lockIcon}>🔒</Text>}
                    {inProgress && <Text style={styles.buildIcon}>⏳</Text>}
                  </View>
                </TouchableOpacity>

                {/* Build/Open Button */}
                <TouchableOpacity
                  onPress={() => handleBuildButtonPress(building.id)}
                  disabled={(unlocked && !canView) || inProgress}
                  style={[
                    styles.actionButton,
                    unlocked && styles.actionButtonOpen,
                    isSelected && styles.actionButtonSelected,
                    (unlocked && !canView) && styles.actionButtonDisabled,
                    inProgress && styles.actionButtonBuilding,
                  ]}>
                  <Text style={styles.actionButtonText}>
                    {inProgress
                      ? buildingProgress
                        ? `${buildingProgress.minutes}:${buildingProgress.seconds.toString().padStart(2, '0')}`
                        : 'Building...'
                      : unlocked
                      ? canView
                        ? 'Open'
                        : timeUntilNext || 'Wait'
                      : 'Build'}
                  </Text>
                </TouchableOpacity>
                {unlocked && !canView && timeUntilNext && (
                  <Text style={styles.cooldownText}>{timeUntilNext}</Text>
                )}
                {inProgress && buildingProgress && (
                  <Text style={styles.buildingProgressText}>
                    Building in progress...
                  </Text>
                )}

                {/* Build Popup */}
                {isSelected && showBuildModal && !unlocked && !inProgress && (
                  <View style={styles.buildPopup}>
                    <View style={styles.buildPopupContent}>
                      <Text style={styles.buildPopupTitle}>{building.title}</Text>
                      <Text style={styles.buildPopupDescription}>
                        Building will take 30 minutes
                      </Text>
                      <View style={styles.buildPopupButtons}>
                        <TouchableOpacity
                          onPress={handleCloseModal}
                          style={styles.popupButtonExit}>
                          <Text style={styles.popupButtonText}>Exit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={handleBuild}
                          style={styles.popupButtonUnlock}>
                          <Text style={styles.popupButtonText}>Start Building</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Cowboy Character */}
        <View style={styles.cowboyContainer}>
          <Image
            source={require('../assets/onboarding/cowboy-1.png')}
            style={styles.cowboyImage}
            resizeMode="contain"
          />
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              These lots are still quiet... need more wood and stone before life
              moves in.
            </Text>
          </View>
        </View>
      </View>

      {/* Quote Modal */}
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
              {currentStoryTitle ? (
                <>
                  <Text style={styles.storyTitle}>
                    {currentStoryTitle} — '{currentStorySubtitle}'
                  </Text>
                  <View style={styles.storyQuoteBox}>
                    <Text style={styles.storyQuoteText}>{currentQuote}</Text>
                  </View>
                </>
              ) : (
                <>
                  <Image
                    source={require('../assets/onboarding/cowboy-1.png')}
                    style={styles.quoteCowboyImage}
                    resizeMode="contain"
                  />
                  <View style={styles.quoteSpeechBubble}>
                    <Text style={styles.quoteText}>{currentQuote}</Text>
                  </View>
                </>
              )}
              <TouchableOpacity
                onPress={() => {
                  setShowQuoteModal(false);
                  setCurrentStoryTitle('');
                  setCurrentStorySubtitle('');
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
  resourcesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  resourceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#654321',
    gap: 8,
  },
  resourceIcon: {
    fontSize: 24,
  },
  resourceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#FFF',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  buildingContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  buildingTouchable: {
    alignItems: 'center',
  },
  buildingIcon: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buildingEmoji: {
    fontSize: 50,
  },
  lockIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    fontSize: 20,
  },
  buildIcon: {
    position: 'absolute',
    top: -5,
    right: -5,
    fontSize: 20,
  },
  cooldownText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY,
    color: '#FFF',
    marginTop: 2,
    textAlign: 'center',
  },
  buildingProgressText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY,
    color: '#FF8C00',
    marginTop: 2,
    textAlign: 'center',
  },
  actionButton: {
    marginTop: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#6B8E23',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#556B2F',
    minWidth: 60,
  },
  actionButtonOpen: {
    backgroundColor: '#8B4513',
    borderColor: '#654321',
  },
  actionButtonSelected: {
    backgroundColor: '#FF8C00',
  },
  actionButtonDisabled: {
    opacity: 0.5,
    backgroundColor: '#654321',
  },
  actionButtonBuilding: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF6347',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
  },
  buildPopup: {
    position: 'absolute',
    top: -80,
    left: -50,
    zIndex: 1000,
  },
  buildPopupContent: {
    backgroundColor: '#DEB887',
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: '#CD853F',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buildPopupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    color: '#654321',
    marginBottom: 8,
    textAlign: 'center',
  },
  buildPopupDescription: {
    fontSize: 12,
    fontFamily: FONT_FAMILY,
    color: '#654321',
    marginBottom: 12,
    textAlign: 'center',
  },
  buildPopupButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  popupButtonExit: {
    flex: 1,
    backgroundColor: '#8B4513',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#654321',
  },
  popupButtonUnlock: {
    flex: 1,
    backgroundColor: '#6B8E23',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#556B2F',
  },
  popupButtonDisabled: {
    opacity: 0.5,
  },
  popupButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY,
    textAlign: 'center',
  },
  cowboyContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    zIndex: 100,
  },
  cowboyImage: {
    width: 120,
    height: 150,
  },
  speechBubble: {
    backgroundColor: '#DEB887',
    borderRadius: 12,
    padding: 12,
    maxWidth: width * 0.5,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#CD853F',
    position: 'relative',
  },
  speechText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY,
    color: '#654321',
    lineHeight: 16,
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
  quoteCowboyImage: {
    width: 150,
    height: 200,
    marginBottom: 20,
  },
  quoteSpeechBubble: {
    backgroundColor: '#DEB887',
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: '#CD853F',
    marginBottom: 20,
    maxWidth: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  quoteText: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    color: '#654321',
    lineHeight: 24,
    textAlign: 'center',
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
});

export default MyTownScreen;
