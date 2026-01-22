import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { loadSessions } from '../utils/storage';
import { BreathingSession } from '../types/breathing';

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
    <View style={styles.sessionCard}>
      <Text style={styles.sessionDate}>{formatDate(item.startTime)}</Text>
      <View style={styles.sessionDetails}>
        <Text style={styles.detailText}>
          Rounds: {item.rounds.length}
        </Text>
        {item.averageHeartRate && (
          <Text style={styles.detailText}>
            Avg HR: {Math.round(item.averageHeartRate)} bpm
          </Text>
        )}
        {item.o2Start && (
          <Text style={styles.detailText}>
            O₂: {item.o2Start}%
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Session History</Text>
        <View style={{ width: 50 }} />
      </View>

      {sessions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No sessions yet</Text>
          <Text style={styles.emptySubtext}>Complete a breathing session to see it here</Text>
        </View>
      ) : (
        <FlatList
          data={sessions}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
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
  list: {
    padding: 20,
  },
  sessionCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sessionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
