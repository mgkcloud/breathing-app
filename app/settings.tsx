import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { loadConfig, saveConfig } from '../utils/storage';
import { BreathingConfig } from '../types/breathing';
import { DEFAULT_CONFIG } from '../constants/config';

export default function SettingsScreen() {
  const router = useRouter();
  const [config, setConfig] = useState<Partial<BreathingConfig>>({});

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Session Configuration</Text>

        <View style={styles.setting}>
          <Text style={styles.label}>Total Rounds</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={config.totalRounds?.toString() || DEFAULT_CONFIG.totalRounds.toString()}
            onChangeText={(text) => setConfig({ ...config, totalRounds: parseInt(text) || DEFAULT_CONFIG.totalRounds })}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.label}>Hyperventilation Breaths</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={config.hyperventilationBreaths?.toString() || DEFAULT_CONFIG.hyperventilationBreaths.toString()}
            onChangeText={(text) => setConfig({ ...config, hyperventilationBreaths: parseInt(text) || DEFAULT_CONFIG.hyperventilationBreaths })}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.label}>Breath Hold Target (seconds)</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={config.breathHoldTarget?.toString() || DEFAULT_CONFIG.breathHoldTarget.toString()}
            onChangeText={(text) => setConfig({ ...config, breathHoldTarget: parseInt(text) || DEFAULT_CONFIG.breathHoldTarget })}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.label}>Exhale Duration (seconds)</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={config.exhaleDuration?.toString() || DEFAULT_CONFIG.exhaleDuration.toString()}
            onChangeText={(text) => setConfig({ ...config, exhaleDuration: parseInt(text) || DEFAULT_CONFIG.exhaleDuration })}
          />
        </View>

        <View style={styles.setting}>
          <Text style={styles.label}>Deep Breaths Recovery</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={config.deepBreathsRecovery?.toString() || DEFAULT_CONFIG.deepBreathsRecovery.toString()}
            onChangeText={(text) => setConfig({ ...config, deepBreathsRecovery: parseInt(text) || DEFAULT_CONFIG.deepBreathsRecovery })}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  saveButton: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  setting: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
  },
});
