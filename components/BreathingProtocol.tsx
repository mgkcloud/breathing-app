import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import BreathingCircle from './BreathingCircle';
import PhaseInstructions from './PhaseInstructions';
import { useBreathingSession } from '../hooks/useBreathingSession';
import { useHealthKit } from '../hooks/useHealthKit';
import { DEFAULT_CONFIG } from '../constants/config';

// Gluestack UI Components
import {
  Box,
  VStack,
  HStack,
  Center,
  Text,
  Heading,
  Button,
  ButtonText,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  BadgeText,
  Pressable,
  WatchIcon,
  HeartIcon,
} from './ui';

const BreathingProtocol: React.FC = () => {
  const {
    sessionState,
    startHyperventilation,
    recordBreath,
    releaseBreathHold,
    completeExhale,
    completeDeepBreaths,
    resetSession,
    togglePause,
    handleHeartRateSubmit: submitHeartRate,
    handleO2Submit: submitO2,
  } = useBreathingSession(DEFAULT_CONFIG);

  // HealthKit integration
  const {
    heartRate: liveHeartRate,
    o2Saturation: liveO2,
    isAuthorized: healthKitAuthorized,
    isAvailable: healthKitAvailable,
    requestAuthorization,
    getLatestHeartRate,
    getLatestO2,
  } = useHealthKit(sessionState.phase !== 'idle' && sessionState.phase !== 'complete');

  const [showHeartRateModal, setShowHeartRateModal] = useState(false);
  const [showO2Modal, setShowO2Modal] = useState(false);
  const [heartRateInput, setHeartRateInput] = useState('');
  const [o2Input, setO2Input] = useState('');
  const [breathHoldTimer, setBreathHoldTimer] = useState(0);
  const [exhaleTimer, setExhaleTimer] = useState(0);
  const [useAppleWatch, setUseAppleWatch] = useState(true);

  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathHoldIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const exhaleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Hyperventilation timer
  useEffect(() => {
    if (sessionState.phase === 'hyperventilation' && !sessionState.isPaused) {
      breathIntervalRef.current = setInterval(() => {
        recordBreath();
      }, 2000);

      return () => {
        if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
      };
    }
  }, [sessionState.phase, sessionState.isPaused, recordBreath]);

  // Handle breath hold completion
  const handleBreathHoldComplete = useCallback(async () => {
    if (breathHoldIntervalRef.current) {
      clearInterval(breathHoldIntervalRef.current);
    }

    if (useAppleWatch && healthKitAuthorized) {
      const hr = await getLatestHeartRate();
      if (hr && hr >= 30 && hr <= 220) {
        submitHeartRate(hr);
        releaseBreathHold(breathHoldTimer);
        return;
      }
    }

    setShowHeartRateModal(true);
  }, [useAppleWatch, healthKitAuthorized, getLatestHeartRate, submitHeartRate, releaseBreathHold, breathHoldTimer]);

  // Breath hold timer
  useEffect(() => {
    if (sessionState.phase === 'breath-hold' && !sessionState.isPaused) {
      setBreathHoldTimer(0);
      breathHoldIntervalRef.current = setInterval(() => {
        setBreathHoldTimer(prev => {
          const newTime = prev + 1;
          if (newTime >= sessionState.breathHoldTarget) {
            handleBreathHoldComplete();
            return newTime;
          }
          return newTime;
        });
      }, 1000);

      return () => {
        if (breathHoldIntervalRef.current) clearInterval(breathHoldIntervalRef.current);
      };
    }
  }, [sessionState.phase, sessionState.isPaused, sessionState.breathHoldTarget, handleBreathHoldComplete]);

  // Exhale timer
  useEffect(() => {
    if (sessionState.phase === 'exhale' && !sessionState.isPaused) {
      setExhaleTimer(0);
      exhaleIntervalRef.current = setInterval(() => {
        setExhaleTimer(prev => {
          const newTime = prev + 1;
          if (newTime >= 5) {
            completeExhale();
            if (exhaleIntervalRef.current) {
              clearInterval(exhaleIntervalRef.current);
            }
            return newTime;
          }
          return newTime;
        });
      }, 1000);

      return () => {
        if (exhaleIntervalRef.current) clearInterval(exhaleIntervalRef.current);
      };
    }
  }, [sessionState.phase, sessionState.isPaused, completeExhale]);

  // Auto-submit O2 from Apple Watch
  useEffect(() => {
    if (useAppleWatch && healthKitAuthorized && liveO2 && liveO2 >= 70 && liveO2 <= 100) {
      submitO2(liveO2);
    }
  }, [liveO2, useAppleWatch, healthKitAuthorized, submitO2]);

  const handleStart = async () => {
    if (healthKitAvailable && !healthKitAuthorized && useAppleWatch) {
      const authorized = await requestAuthorization();
      if (!authorized) {
        Alert.alert(
          'Apple Watch',
          'HealthKit access denied. You can still enter values manually.',
          [{ text: 'OK' }]
        );
      }
    }
    startHyperventilation();
  };

  const handleHeartRateSubmit = () => {
    const hr = parseInt(heartRateInput);
    if (isNaN(hr) || hr < 30 || hr > 220) {
      Alert.alert('Invalid Heart Rate', 'Please enter a valid heart rate (30-220)');
      return;
    }
    submitHeartRate(hr);
    setHeartRateInput('');
    setShowHeartRateModal(false);
    releaseBreathHold(breathHoldTimer);
  };

  const handleO2SubmitLocal = () => {
    const o2 = parseInt(o2Input);
    if (isNaN(o2) || o2 < 70 || o2 > 100) {
      Alert.alert('Invalid O2 Level', 'Please enter a valid O2 saturation (70-100)');
      return;
    }
    submitO2(o2);
    setO2Input('');
    setShowO2Modal(false);
  };

  const getProgress = () => {
    if (sessionState.phase === 'breath-hold') {
      return breathHoldTimer / sessionState.breathHoldTarget;
    }
    if (sessionState.phase === 'exhale') {
      return exhaleTimer / 5;
    }
    return 0;
  };

  const toggleAppleWatch = async () => {
    if (!useAppleWatch && healthKitAvailable && !healthKitAuthorized) {
      const authorized = await requestAuthorization();
      if (authorized) {
        setUseAppleWatch(true);
      }
    } else {
      setUseAppleWatch(!useAppleWatch);
    }
  };

  return (
    <Box style={styles.container}>
      {/* Apple Watch Status Badge */}
      {healthKitAvailable && (
        <Pressable onPress={toggleAppleWatch}>
          <Center style={styles.watchStatusContainer}>
            <HStack space="sm" style={styles.watchStatus}>
              <WatchIcon
                color={useAppleWatch && healthKitAuthorized ? '#22c55e' : '#9ca3af'}
                width={20}
                height={20}
              />
              <Text
                size="sm"
                style={{
                  color: useAppleWatch && healthKitAuthorized ? '#22c55e' : '#9ca3af',
                  fontWeight: '500',
                }}
              >
                {useAppleWatch && healthKitAuthorized ? 'Apple Watch Connected' :
                 useAppleWatch ? 'Tap to Connect' : 'Manual Mode'}
              </Text>
            </HStack>
          </Center>
        </Pressable>
      )}

      {/* Live Health Data Display */}
      {useAppleWatch && healthKitAuthorized && sessionState.phase !== 'idle' && (
        <Box style={styles.healthDataContainer}>
          <HStack space="xl" style={styles.healthDataRow}>
            <VStack style={styles.healthDataItem}>
              <Text size="xs" style={styles.healthDataLabel}>HR</Text>
              <Heading size="2xl" style={styles.healthDataValue}>
                {liveHeartRate ? `${liveHeartRate}` : '--'}
              </Heading>
              <Text size="xs" style={styles.healthDataUnit}>BPM</Text>
            </VStack>

            <View style={styles.healthDivider} />

            <VStack style={styles.healthDataItem}>
              <Text size="xs" style={styles.healthDataLabel}>SpO₂</Text>
              <Heading size="2xl" style={styles.healthDataValue}>
                {liveO2 ? `${liveO2}` : '--'}
              </Heading>
              <Text size="xs" style={styles.healthDataUnit}>%</Text>
            </VStack>
          </HStack>
        </Box>
      )}

      {/* Breathing Circle */}
      <BreathingCircle
        phase={sessionState.phase}
        progress={getProgress()}
      />

      {/* Phase Instructions */}
      <PhaseInstructions
        phase={sessionState.phase}
        currentRound={sessionState.currentRound}
        totalRounds={sessionState.totalRounds}
        breathCount={sessionState.breathCount}
        targetBreaths={sessionState.targetBreaths}
        timer={sessionState.phase === 'breath-hold' ? breathHoldTimer :
               sessionState.phase === 'exhale' ? exhaleTimer : undefined}
      />

      {/* Action Buttons */}
      <HStack space="md" style={styles.buttonContainer}>
        {sessionState.phase === 'idle' && (
          <Button action="primary" size="lg" onPress={handleStart} style={styles.primaryButton}>
            <ButtonText>Start Session</ButtonText>
          </Button>
        )}

        {(sessionState.phase === 'hyperventilation' ||
          sessionState.phase === 'breath-hold' ||
          sessionState.phase === 'exhale' ||
          sessionState.phase === 'deep-breaths') && (
          <>
            <Button
              action={sessionState.isPaused ? 'positive' : 'secondary'}
              size="md"
              onPress={togglePause}
              style={styles.actionButton}
            >
              <ButtonText>{sessionState.isPaused ? 'Resume' : 'Pause'}</ButtonText>
            </Button>

            {(!useAppleWatch || !healthKitAuthorized) && (
              <Button
                action="default"
                variant="outline"
                size="md"
                onPress={() => setShowO2Modal(true)}
                style={[styles.actionButton, styles.o2Button]}
              >
                <ButtonText style={{ color: '#8b5cf6' }}>O₂ Level</ButtonText>
              </Button>
            )}

            <Button
              action="negative"
              size="md"
              onPress={resetSession}
              style={styles.actionButton}
            >
              <ButtonText>Reset</ButtonText>
            </Button>
          </>
        )}

        {sessionState.phase === 'complete' && (
          <Button action="primary" size="lg" onPress={resetSession} style={styles.primaryButton}>
            <ButtonText>New Session</ButtonText>
          </Button>
        )}
      </HStack>

      {/* Heart Rate Modal */}
      <Modal isOpen={showHeartRateModal} onClose={() => setShowHeartRateModal(false)} size="sm">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Enter Heart Rate</Heading>
          </ModalHeader>
          <ModalBody>
            <VStack space="md">
              <Text size="sm" style={styles.modalSubtitle}>
                {healthKitAvailable ? 'Apple Watch data not available' : 'Manual entry required'}
              </Text>
              <Input size="lg">
                <InputField
                  keyboardType="number-pad"
                  value={heartRateInput}
                  onChangeText={setHeartRateInput}
                  placeholder="BPM"
                  style={styles.inputField}
                />
              </Input>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button action="primary" onPress={handleHeartRateSubmit} style={{ flex: 1 }}>
              <ButtonText>Submit</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* O2 Modal */}
      <Modal isOpen={showO2Modal} onClose={() => setShowO2Modal(false)} size="sm">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Enter O₂ Saturation</Heading>
          </ModalHeader>
          <ModalBody>
            <Input size="lg">
              <InputField
                keyboardType="number-pad"
                value={o2Input}
                onChangeText={setO2Input}
                placeholder="%"
                style={styles.inputField}
              />
            </Input>
          </ModalBody>
          <ModalFooter>
            <HStack space="md" style={{ flex: 1 }}>
              <Button
                action="secondary"
                variant="outline"
                onPress={() => setShowO2Modal(false)}
                style={{ flex: 1 }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button action="primary" onPress={handleO2SubmitLocal} style={{ flex: 1 }}>
                <ButtonText>Submit</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  watchStatusContainer: {
    marginBottom: 12,
  },
  watchStatus: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  healthDataContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  healthDataRow: {
    justifyContent: 'center',
  },
  healthDataItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  healthDataLabel: {
    color: '#6b7280',
    fontWeight: '500',
  },
  healthDataValue: {
    color: '#1f2937',
  },
  healthDataUnit: {
    color: '#9ca3af',
  },
  healthDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  buttonContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  primaryButton: {
    minWidth: 200,
    borderRadius: 12,
  },
  actionButton: {
    minWidth: 100,
    borderRadius: 12,
  },
  o2Button: {
    borderColor: '#8b5cf6',
  },
  modalSubtitle: {
    color: '#6b7280',
  },
  inputField: {
    textAlign: 'center',
    fontSize: 24,
  },
});

export default BreathingProtocol;
