import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { loadConfig, saveConfig } from '../utils/storage';
import { BreathingConfig } from '../types/breathing';
import { DEFAULT_CONFIG } from '../constants/config';
import { useHealthKit } from '../hooks/useHealthKit';

// Gluestack UI Components
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  ButtonText,
  Input,
  InputField,
  Pressable,
  Divider,
  Badge,
  BadgeText,
  ChevronLeftIcon,
  WatchIcon,
  HeartIcon,
  CheckIcon,
} from '../components/ui';

export default function SettingsScreen() {
  const router = useRouter();
  const [config, setConfig] = useState<Partial<BreathingConfig>>({});

  const {
    isAvailable: healthKitAvailable,
    isAuthorized: healthKitAuthorized,
    requestAuthorization,
    error: healthKitError,
  } = useHealthKit(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedConfig = await loadConfig();
    setConfig(savedConfig);
  };

  const handleSave = async () => {
    await saveConfig(config);
    router.back();
  };

  const handleConnectWatch = async () => {
    if (!healthKitAvailable) {
      Alert.alert(
        'Not Available',
        'HealthKit is not available on this device. Make sure you\'re running on a real iOS device.',
        [{ text: 'OK' }]
      );
      return;
    }

    const authorized = await requestAuthorization();
    if (authorized) {
      Alert.alert('Connected', 'Apple Watch is now connected. Heart rate and O2 data will be automatically captured during sessions.');
    } else {
      Alert.alert(
        'Permission Denied',
        'Please enable HealthKit access in Settings > Privacy > Health > Breathing App',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <Box style={styles.container}>
      {/* Header */}
      <HStack style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <HStack space="xs">
            <ChevronLeftIcon color="#3b82f6" width={20} height={20} />
            <Text style={styles.backText}>Back</Text>
          </HStack>
        </Pressable>
        <Heading size="lg">Settings</Heading>
        <Button action="primary" variant="link" onPress={handleSave}>
          <ButtonText>Save</ButtonText>
        </Button>
      </HStack>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <VStack space="lg" style={styles.content}>
          {/* Apple Watch Section */}
          {Platform.OS === 'ios' && (
            <>
              <VStack space="md">
                <Heading size="md" style={styles.sectionTitle}>Apple Watch</Heading>

                <Box style={styles.card}>
                  <VStack space="md">
                    <HStack style={styles.watchRow}>
                      <HStack space="md" style={styles.watchInfo}>
                        <WatchIcon
                          color={healthKitAuthorized ? '#22c55e' : '#6b7280'}
                          width={24}
                          height={24}
                        />
                        <VStack>
                          <Text bold style={styles.cardLabel}>HealthKit Connection</Text>
                          <Text
                            size="sm"
                            style={{
                              color: healthKitAuthorized ? '#22c55e' :
                                     healthKitAvailable ? '#f59e0b' : '#ef4444'
                            }}
                          >
                            {healthKitAuthorized ? 'Connected' :
                             healthKitAvailable ? 'Not Connected' :
                             'Not Available'}
                          </Text>
                        </VStack>
                      </HStack>

                      <Button
                        action={healthKitAuthorized ? 'positive' : 'primary'}
                        size="sm"
                        onPress={handleConnectWatch}
                        isDisabled={healthKitAuthorized}
                      >
                        <ButtonText>
                          {healthKitAuthorized ? 'Connected' : 'Connect'}
                        </ButtonText>
                      </Button>
                    </HStack>

                    <Text size="sm" style={styles.description}>
                      {healthKitAuthorized
                        ? 'Heart rate and O2 saturation will be automatically captured from your Apple Watch during breathing sessions.'
                        : 'Connect your Apple Watch to automatically track heart rate and blood oxygen during breathing exercises.'}
                    </Text>

                    {healthKitAuthorized && (
                      <>
                        <Divider />
                        <HStack space="lg" style={styles.dataTypes}>
                          <HStack space="sm">
                            <HeartIcon color="#ef4444" width={18} height={18} />
                            <Text size="sm" style={styles.dataTypeLabel}>Heart Rate</Text>
                          </HStack>
                          <HStack space="sm">
                            <Text style={styles.lungIcon}>🫁</Text>
                            <Text size="sm" style={styles.dataTypeLabel}>Blood Oxygen</Text>
                          </HStack>
                        </HStack>
                      </>
                    )}
                  </VStack>
                </Box>
              </VStack>
            </>
          )}

          {/* Session Configuration */}
          <VStack space="md">
            <Heading size="md" style={styles.sectionTitle}>Session Configuration</Heading>

            <Box style={styles.card}>
              <VStack space="sm">
                <Text size="sm" style={styles.inputLabel}>Total Rounds</Text>
                <Input size="md">
                  <InputField
                    keyboardType="number-pad"
                    value={config.totalRounds?.toString() || DEFAULT_CONFIG.totalRounds.toString()}
                    onChangeText={(text) => setConfig({ ...config, totalRounds: parseInt(text) || DEFAULT_CONFIG.totalRounds })}
                  />
                </Input>
              </VStack>
            </Box>

            <Box style={styles.card}>
              <VStack space="sm">
                <Text size="sm" style={styles.inputLabel}>Hyperventilation Breaths</Text>
                <Input size="md">
                  <InputField
                    keyboardType="number-pad"
                    value={config.hyperventilationBreaths?.toString() || DEFAULT_CONFIG.hyperventilationBreaths.toString()}
                    onChangeText={(text) => setConfig({ ...config, hyperventilationBreaths: parseInt(text) || DEFAULT_CONFIG.hyperventilationBreaths })}
                  />
                </Input>
              </VStack>
            </Box>

            <Box style={styles.card}>
              <VStack space="sm">
                <Text size="sm" style={styles.inputLabel}>Breath Hold Target (seconds)</Text>
                <Input size="md">
                  <InputField
                    keyboardType="number-pad"
                    value={config.breathHoldTarget?.toString() || DEFAULT_CONFIG.breathHoldTarget.toString()}
                    onChangeText={(text) => setConfig({ ...config, breathHoldTarget: parseInt(text) || DEFAULT_CONFIG.breathHoldTarget })}
                  />
                </Input>
              </VStack>
            </Box>

            <Box style={styles.card}>
              <VStack space="sm">
                <Text size="sm" style={styles.inputLabel}>Exhale Duration (seconds)</Text>
                <Input size="md">
                  <InputField
                    keyboardType="number-pad"
                    value={config.exhaleDuration?.toString() || DEFAULT_CONFIG.exhaleDuration.toString()}
                    onChangeText={(text) => setConfig({ ...config, exhaleDuration: parseInt(text) || DEFAULT_CONFIG.exhaleDuration })}
                  />
                </Input>
              </VStack>
            </Box>

            <Box style={styles.card}>
              <VStack space="sm">
                <Text size="sm" style={styles.inputLabel}>Deep Breaths Recovery</Text>
                <Input size="md">
                  <InputField
                    keyboardType="number-pad"
                    value={config.deepBreathsRecovery?.toString() || DEFAULT_CONFIG.deepBreathsRecovery.toString()}
                    onChangeText={(text) => setConfig({ ...config, deepBreathsRecovery: parseInt(text) || DEFAULT_CONFIG.deepBreathsRecovery })}
                  />
                </Input>
              </VStack>
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#1f2937',
    marginBottom: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardLabel: {
    color: '#1f2937',
  },
  watchRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  watchInfo: {
    flex: 1,
    alignItems: 'center',
  },
  description: {
    color: '#6b7280',
    lineHeight: 20,
  },
  dataTypes: {
    paddingTop: 4,
  },
  dataTypeLabel: {
    color: '#4b5563',
  },
  lungIcon: {
    fontSize: 16,
  },
  inputLabel: {
    color: '#6b7280',
    fontWeight: '500',
  },
});
