import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import BreathingCircle from './BreathingCircle';
import PhaseInstructions from './PhaseInstructions';
import { useBreathingSession } from '../hooks/useBreathingSession';
import { DEFAULT_CONFIG } from '../constants/config';

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
    handleHeartRateSubmit,
    handleO2Submit,
  } = useBreathingSession(DEFAULT_CONFIG);

  const [showHeartRateModal, setShowHeartRateModal] = useState(false);
  const [showO2Modal, setShowO2Modal] = useState(false);
  const [heartRateInput, setHeartRateInput] = useState('');
  const [o2Input, setO2Input] = useState('');
  const [breathHoldTimer, setBreathHoldTimer] = useState(0);
  const [exhaleTimer, setExhaleTimer] = useState(0);

  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathHoldIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const exhaleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Hyperventilation timer
  useEffect(() => {
    if (sessionState.phase === 'hyperventilation' && !sessionState.isPaused) {
      breathIntervalRef.current = setInterval(() => {
        recordBreath();
      }, 2000); // One breath every 2 seconds

      return () => {
        if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
      };
    }
  }, [sessionState.phase, sessionState.isPaused, recordBreath]);

  // Breath hold timer
  useEffect(() => {
    if (sessionState.phase === 'breath-hold' && !sessionState.isPaused) {
      setBreathHoldTimer(0);
      breathHoldIntervalRef.current = setInterval(() => {
        setBreathHoldTimer(prev => {
          const newTime = prev + 1;
          if (newTime >= sessionState.breathHoldTarget) {
            // Show heart rate prompt
            setShowHeartRateModal(true);
            if (breathHoldIntervalRef.current) {
              clearInterval(breathHoldIntervalRef.current);
            }
            return newTime;
          }
          return newTime;
        });
      }, 1000);

      return () => {
        if (breathHoldIntervalRef.current) clearInterval(breathHoldIntervalRef.current);
      };
    }
  }, [sessionState.phase, sessionState.isPaused, sessionState.breathHoldTarget]);

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

  const handleStart = () => {
    startHyperventilation();
  };

  const handleHeartRateSubmit = () => {
    const hr = parseInt(heartRateInput);
    if (isNaN(hr) || hr < 30 || hr > 220) {
      Alert.alert('Invalid Heart Rate', 'Please enter a valid heart rate (30-220)');
      return;
    }
    handleHeartRateSubmit(hr);
    setHeartRateInput('');
    setShowHeartRateModal(false);
    releaseBreathHold(breathHoldTimer);
  };

  const handleO2Submit = () => {
    const o2 = parseInt(o2Input);
    if (isNaN(o2) || o2 < 70 || o2 > 100) {
      Alert.alert('Invalid O2 Level', 'Please enter a valid O2 saturation (70-100)');
      return;
    }
    handleO2Submit(o2);
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

  return (
    <View style={styles.container}>
      <BreathingCircle
        phase={sessionState.phase}
        progress={getProgress()}
      />

      <PhaseInstructions
        phase={sessionState.phase}
        currentRound={sessionState.currentRound}
        totalRounds={sessionState.totalRounds}
        breathCount={sessionState.breathCount}
        targetBreaths={sessionState.targetBreaths}
        timer={sessionState.phase === 'breath-hold' ? breathHoldTimer :
               sessionState.phase === 'exhale' ? exhaleTimer : undefined}
      />

      <View style={styles.buttonContainer}>
        {sessionState.phase === 'idle' && (
          <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleStart}>
            <Text style={styles.buttonText}>Start Session</Text>
          </TouchableOpacity>
        )}

        {(sessionState.phase === 'hyperventilation' ||
          sessionState.phase === 'breath-hold' ||
          sessionState.phase === 'exhale' ||
          sessionState.phase === 'deep-breaths') && (
          <>
            <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={togglePause}>
              <Text style={styles.buttonText}>
                {sessionState.isPaused ? 'Resume' : 'Pause'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.o2Button]} onPress={() => setShowO2Modal(true)}>
              <Text style={styles.buttonText}>O₂ Level</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetSession}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </>
        )}

        {sessionState.phase === 'complete' && (
          <TouchableOpacity style={[styles.button, styles.startButton]} onPress={resetSession}>
            <Text style={styles.buttonText}>New Session</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Heart Rate Modal */}
      <Modal visible={showHeartRateModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Heart Rate</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={heartRateInput}
              onChangeText={setHeartRateInput}
              placeholder="BPM"
              autoFocus
            />
            <TouchableOpacity style={[styles.button, styles.modalButton]} onPress={handleHeartRateSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* O2 Modal */}
      <Modal visible={showO2Modal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter O₂ Saturation</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={o2Input}
              onChangeText={setO2Input}
              placeholder="%"
              autoFocus
            />
            <TouchableOpacity style={[styles.button, styles.modalButton]} onPress={handleO2Submit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.modalButton, styles.cancelButton]} onPress={() => setShowO2Modal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#3b82f6',
  },
  pauseButton: {
    backgroundColor: '#f59e0b',
  },
  resetButton: {
    backgroundColor: '#ef4444',
  },
  o2Button: {
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#3b82f6',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#6b7280',
    marginTop: 8,
  },
});

export default BreathingProtocol;
