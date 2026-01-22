import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useRouter } from 'expo-router';
import { loadSessions } from '../utils/storage';
import { BreathingSession } from '../types/breathing';

// Gluestack UI Components
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Pressable,
  Center,
  Badge,
  BadgeText,
  ChevronLeftIcon,
  HeartIcon,
} from '../components/ui';

export default function HistoryScreen() {
  const router = useRouter();
  const [sessions, setSessions] = useState<BreathingSession[]>([]);

  useEffect(() => {
    loadSessionsData();
  }, []);

  const loadSessionsData = async () => {
    const data = await loadSessions();
    setSessions(data);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderSession = ({ item }: { item: BreathingSession }) => (
    <Box style={styles.sessionCard}>
      <VStack space="sm">
        <HStack style={styles.sessionHeader}>
          <Text bold size="md" style={styles.sessionDate}>
            {formatDate(item.startTime)}
          </Text>
          <Badge action="info" size="sm">
            <BadgeText>{item.rounds.length} rounds</BadgeText>
          </Badge>
        </HStack>

        <HStack space="lg" style={styles.sessionDetails}>
          {item.averageHeartRate && (
            <HStack space="xs" style={styles.detailItem}>
              <HeartIcon color="#ef4444" width={16} height={16} />
              <Text size="sm" style={styles.detailText}>
                {Math.round(item.averageHeartRate)} bpm
              </Text>
            </HStack>
          )}
          {item.o2Start && (
            <HStack space="xs" style={styles.detailItem}>
              <Text style={styles.lungIcon}>🫁</Text>
              <Text size="sm" style={styles.detailText}>
                {item.o2Start}%
              </Text>
            </HStack>
          )}
        </HStack>
      </VStack>
    </Box>
  );

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
        <Heading size="lg">Session History</Heading>
        <View style={{ width: 60 }} />
      </HStack>

      {sessions.length === 0 ? (
        <Center style={styles.emptyState}>
          <VStack space="sm" style={styles.emptyContent}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Heading size="md" style={styles.emptyTitle}>No sessions yet</Heading>
            <Text size="sm" style={styles.emptySubtext}>
              Complete a breathing session to see it here
            </Text>
          </VStack>
        </Center>
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  list: {
    padding: 20,
    paddingBottom: 40,
  },
  sessionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sessionHeader: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionDate: {
    color: '#1f2937',
  },
  sessionDetails: {
    flexWrap: 'wrap',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    color: '#6b7280',
  },
  lungIcon: {
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    padding: 40,
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#1f2937',
  },
  emptySubtext: {
    color: '#6b7280',
    textAlign: 'center',
  },
});
