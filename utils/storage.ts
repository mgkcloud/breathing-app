import AsyncStorage from '@react-native-async-storage/async-storage';
import { BreathingSession, SessionState, BreathingConfig } from '../types/breathing';
import { STORAGE_KEYS, DEFAULT_CONFIG } from '../constants/config';

// Session Storage
export const saveSessions = async (sessions: BreathingSession[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save sessions:', error);
  }
};

export const loadSessions = async (): Promise<BreathingSession[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load sessions:', error);
    return [];
  }
};

export const addSession = async (session: BreathingSession): Promise<void> => {
  try {
    const sessions = await loadSessions();
    sessions.unshift(session); // Add to beginning
    await saveSessions(sessions);
  } catch (error) {
    console.error('Failed to add session:', error);
  }
};

// Active Session State
export const saveActiveSession = async (state: SessionState): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save active session:', error);
  }
};

export const loadActiveSession = async (): Promise<SessionState | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load active session:', error);
    return null;
  }
};

export const clearActiveSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  } catch (error) {
    console.error('Failed to clear active session:', error);
  }
};

// Config Storage
export const saveConfig = async (config: Partial<BreathingConfig>): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  } catch (error) {
    console.error('Failed to save config:', error);
  }
};

export const loadConfig = async (): Promise<Partial<BreathingConfig>> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CONFIG);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to load config:', error);
    return {};
  }
};
