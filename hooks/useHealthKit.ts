import { useEffect, useState, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import AppleHealthKit, {
  HealthKitPermissions,
  HealthValue,
} from 'react-native-health';

interface HealthKitState {
  heartRate: number | null;
  o2Saturation: number | null;
  isAuthorized: boolean;
  isAvailable: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const permissions: HealthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.OxygenSaturation,
    ],
    write: [],
  },
};

export const useHealthKit = (isActive: boolean) => {
  const [state, setState] = useState<HealthKitState>({
    heartRate: null,
    o2Saturation: null,
    isAuthorized: false,
    isAvailable: Platform.OS === 'ios',
    error: null,
    lastUpdated: null,
  });

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Request permissions
  const requestAuthorization = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== 'ios') {
      setState(prev => ({
        ...prev,
        isAvailable: false,
        error: 'HealthKit is only available on iOS'
      }));
      return false;
    }

    return new Promise((resolve) => {
      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        if (error) {
          setState(prev => ({
            ...prev,
            isAuthorized: false,
            error: 'Failed to authorize HealthKit: ' + error
          }));
          resolve(false);
        } else {
          setState(prev => ({
            ...prev,
            isAuthorized: true,
            error: null
          }));
          resolve(true);
        }
      });
    });
  }, []);

  // Get latest heart rate from HealthKit
  const getLatestHeartRate = useCallback(async (): Promise<number | null> => {
    if (!state.isAuthorized || Platform.OS !== 'ios') return null;

    return new Promise((resolve) => {
      const options = {
        startDate: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // Last 5 minutes
        endDate: new Date().toISOString(),
        ascending: false,
        limit: 1,
      };

      AppleHealthKit.getHeartRateSamples(options, (err: string, results: HealthValue[]) => {
        if (err || !results || results.length === 0) {
          resolve(null);
          return;
        }

        const hr = Math.round(results[0].value);
        setState(prev => ({
          ...prev,
          heartRate: hr,
          lastUpdated: new Date()
        }));
        resolve(hr);
      });
    });
  }, [state.isAuthorized]);

  // Get latest O2 saturation from HealthKit
  const getLatestO2 = useCallback(async (): Promise<number | null> => {
    if (!state.isAuthorized || Platform.OS !== 'ios') return null;

    return new Promise((resolve) => {
      const options = {
        startDate: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // Last 5 minutes
        endDate: new Date().toISOString(),
        ascending: false,
        limit: 1,
      };

      AppleHealthKit.getOxygenSaturationSamples(options, (err: string, results: HealthValue[]) => {
        if (err || !results || results.length === 0) {
          resolve(null);
          return;
        }

        // O2 saturation is stored as a decimal (0.98 = 98%)
        const o2 = Math.round(results[0].value * 100);
        setState(prev => ({
          ...prev,
          o2Saturation: o2,
          lastUpdated: new Date()
        }));
        resolve(o2);
      });
    });
  }, [state.isAuthorized]);

  // Fetch both values
  const fetchLatestData = useCallback(async () => {
    await Promise.all([getLatestHeartRate(), getLatestO2()]);
  }, [getLatestHeartRate, getLatestO2]);

  // Poll for updates when session is active
  useEffect(() => {
    if (!isActive || !state.isAuthorized) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    // Initial fetch
    fetchLatestData();

    // Poll every 3 seconds
    pollingRef.current = setInterval(fetchLatestData, 3000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [isActive, state.isAuthorized, fetchLatestData]);

  return {
    heartRate: state.heartRate,
    o2Saturation: state.o2Saturation,
    isAuthorized: state.isAuthorized,
    isAvailable: state.isAvailable,
    error: state.error,
    lastUpdated: state.lastUpdated,
    requestAuthorization,
    getLatestHeartRate,
    getLatestO2,
    fetchLatestData,
  };
};
