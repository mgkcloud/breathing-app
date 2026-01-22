export type SessionPhase =
  | 'idle'
  | 'hyperventilation'
  | 'breath-hold'
  | 'exhale'
  | 'deep-breaths'
  | 'complete';

export interface Round {
  type: 'hyperventilation' | 'breath-hold' | 'deep-breaths';
  duration: number;
  heartRateStart?: number;
  heartRateEnd?: number;
  o2SaturationStart?: number;
  o2SaturationEnd?: number;
  breathHoldDuration?: number;
  timestamp: string;
}

export interface BreathingSession {
  id: string;
  startTime: string;
  endTime?: string;
  rounds: Round[];
  averageHeartRate?: number;
  o2Start?: number;
  o2End?: number;
  totalDuration?: number;
}

export interface SessionState {
  phase: SessionPhase;
  currentRound: number;
  totalRounds: number;
  breathCount: number;
  targetBreaths: number;
  breathHoldTarget: number;
  breathHoldElapsed: number;
  exhaleElapsed: number;
  deepBreathCount: number;
  targetDeepBreaths: number;
  isPaused: boolean;
  isComplete: boolean;
  roundData: Round[];
  o2Saturation?: number;
}

export interface BreathingConfig {
  totalRounds: number;
  hyperventilationBreaths: number;
  breathHoldTarget: number;
  exhaleDuration: number;
  deepBreathsRecovery: number;
}
