import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BreathingProtocol from '../components/BreathingProtocol';

// Gluestack UI Components
import {
  Box,
  HStack,
  Heading,
  Button,
  ButtonText,
  HistoryIcon,
  SettingsIcon,
} from '../components/ui';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <Box style={styles.container}>
      {/* Header */}
      <HStack style={styles.header}>
        <Heading size="xl">Breathing App</Heading>
        <HStack space="sm">
          <Button
            action="default"
            variant="outline"
            size="sm"
            onPress={() => router.push('/history')}
            style={styles.navButton}
          >
            <HistoryIcon color="#4b5563" width={18} height={18} />
            <ButtonText style={styles.navButtonText}>History</ButtonText>
          </Button>
          <Button
            action="default"
            variant="outline"
            size="sm"
            onPress={() => router.push('/settings')}
            style={styles.navButton}
          >
            <SettingsIcon color="#4b5563" width={18} height={18} />
            <ButtonText style={styles.navButtonText}>Settings</ButtonText>
          </Button>
        </HStack>
      </HStack>

      {/* Main Content */}
      <BreathingProtocol />
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
  navButton: {
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
    borderRadius: 8,
    gap: 6,
  },
  navButtonText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
});
