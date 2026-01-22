import { useState, useCallback, useRef } from 'react';
import { SessionPhase, SessionState, Round, BreathingSession } from '../types/breathing';
import { DEFAULT_CONFIG } from '../constants/config';
import { saveActiveSession, clearActiveSession, addSession } from '../utils/storage';

export const useBreathingSession = (config = DEFAULT_CONFIG) => {
  const [sessionState, setSessionState] = useState<SessionState>({
    phase: 'idle',
    currentRound: 1,
    totalRounds: config.totalRounds,
    breathCount: 0,
    targetBreaths: config.hyperventilationBreaths,
    breathHoldTarget: config.breathHoldTarget,
    breathHoldElapsed: 0,
    exhaleElapsed: 0,
    deepBreathCount: 0,
    targetDeepBreaths: config.deepBreathsRecovery,
    isPaused: false,
    isComplete: false,
    roundData: [],
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const roundDataRef = useRef<Round[]>([]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const saveRoundData = useCallback((
    type: Round['type'],
    duration: number,
    extraData?: Partial<Round>
  ) => {
    const round: Round = {
      type,
      duration,
      timestamp: new Date().toISOString(),
      ...extraData,
    };
    roundDataRef.current.push(round);
  }, []);

  const startHyperventilation = useCallback(() => {
    clearTimer();
    setSessionState(prev => ({
      ...prev,
      phase: 'hyperventilation',
      breathCount: 0,
    }));
  }, [clearTimer]);

  const recordBreath = useCallback(() => {
    setSessionState(prev => {
      if (prev.breathCount >= prev.targetBreaths - 1) {
        // Completed hyperventilation phase
        saveRoundData('hyperventilation', prev.targetBreaths);
        return {
          ...prev,
          breathCount: prev.breathCount + 1,
          phase: 'breath-hold',
          breathHoldElapsed: 0,
        };
      }
      return {
        ...prev,
        breathCount: prev.breathCount + 1,
      };
    });
  }, [saveRoundData]);

  const releaseBreathHold = useCallback((duration: number) => {
    saveRoundData('breath-hold', duration, {
      breathHoldDuration: duration,
    });
    setSessionState(prev => ({
      ...prev,
      phase: 'exhale',
      breathHoldElapsed: 0,
      exhaleElapsed: 0,
    }));
  }, [saveRoundData]);

  const completeExhale = useCallback(() => {
    setSessionState(prev => {
      if (prev.currentRound < prev.totalRounds) {
        // More rounds to go
        saveRoundData('exhale', prev.exhaleElapsed);
        return {
          ...prev,
          phase: 'deep-breaths',
          deepBreathCount: 0,
        };
      } else {
        // Session complete
        completeSession();
        return {
          ...prev,
          phase: 'complete',
          isComplete: true,
        };
      }
    });
  }, []);

  const completeDeepBreaths = useCallback(() => {
    setSessionState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      phase: 'hyperventilation',
      breathCount: 0,
    }));
  }, []);

  const completeSession = useCallback(async () => {
    clearTimer();
    const session: BreathingSession = {
      id: Date.now().toString(),
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      rounds: roundDataRef.current,
    };

    // Calculate average heart rate
    const heartRates = roundDataRef.current
      .map(r => r.heartRateEnd)
      .filter((hr): hr is number => hr !== undefined);
    if (heartRates.length > 0) {
      session.averageHeartRate = heartRates.reduce((a, b) => a + b, 0) / heartRates.length;
    }

    await addSession(session);
    await clearActiveSession();
  }, [clearTimer]);

  const resetSession = useCallback(() => {
    clearTimer();
    roundDataRef.current = [];
    setSessionState({
      phase: 'idle',
      currentRound: 1,
      totalRounds: config.totalRounds,
      breathCount: 0,
      targetBreaths: config.hyperventilationBreaths,
      breathHoldTarget: config.breathHoldTarget,
      breathHoldElapsed: 0,
      exhaleElapsed: 0,
      deepBreathCount: 0,
      targetDeepBreaths: config.deepBreathsRecovery,
      isPaused: false,
      isComplete: false,
      roundData: [],
    });
  }, [clearTimer, config]);

  const togglePause = useCallback(() => {
    setSessionState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const handleHeartRateSubmit = useCallback((heartRate: number) => {
    const lastRound = roundDataRef.current[roundDataRef.current.length - 1];
    if (lastRound) {
      lastRound.heartRateEnd = heartRate;
    }
  }, []);

  const handleO2Submit = useCallback((o2: number) => {
    setSessionState(prev => ({
      ...prev,
      o2Saturation: o2,
    }));
  }, []);

  return {
    sessionState,
    setSessionState,
    startHyperventilation,
    recordBreath,
    releaseBreathHold,
    completeExhale,
    completeDeepBreaths,
    resetSession,
    togglePause,
    handleHeartRateSubmit,
    handleO2Submit,
  };
};
