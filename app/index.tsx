import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import BreathingProtocol from '../components/BreathingProtocol';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Breathing App</Text>
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/history')}
          >
            <Text style={styles.navButtonText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/settings')}
          >
            <Text style={styles.navButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BreathingProtocol />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  navButtonText: {
    fontSize: 14,
    color: #4b5563',
    fontWeight: '500',
  },
});
