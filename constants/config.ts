import { BreathingConfig } from '../types/breathing';

export const DEFAULT_CONFIG: BreathingConfig = {
  totalRounds: 3,
  hyperventilationBreaths: 30,
  breathHoldTarget: 15,
  exhaleDuration: 5,
  deepBreathsRecovery: 5,
};

export const PHASE_COLORS = {
  idle: '#6366f1',
  hyperventilation: '#3b82f6',
  'breath-hold': '#8b5cf6',
  exhale: '#06b6d4',
  'deep-breaths': '#10b981',
  complete: '#22c55e',
};

export const PHASE_INSTRUCTIONS = {
  idle: 'Press Start to begin your breathing session',
  hyperventilation: 'Take deep, rapid breaths in and out',
  'breath-hold': 'Hold your breath gently',
  exhale: 'Exhale slowly and completely',
  'deep-breaths': 'Take slow, deep recovery breaths',
  complete: 'Session complete! Great work.',
};

export const STORAGE_KEYS = {
  SESSIONS: 'breathing_sessions',
  ACTIVE_SESSION: 'active_session',
  CONFIG: 'breathing_config',
};
