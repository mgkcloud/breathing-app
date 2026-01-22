import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PHASE_COLORS, PHASE_INSTRUCTIONS } from '../constants/config';

interface PhaseInstructionsProps {
  phase: string;
  currentRound: number;
  totalRounds: number;
  breathCount?: number;
  targetBreaths?: number;
  timer?: number;
}

const PhaseInstructions: React.FC<PhaseInstructionsProps> = ({
  phase,
  currentRound,
  totalRounds,
  breathCount,
  targetBreaths,
  timer,
}) => {
  const getPhaseTitle = () => {
    const titles: Record<string, string> = {
      idle: 'Ready to Begin',
      hyperventilation: 'Hyperventilation',
      'breath-hold': 'Breath Hold',
      exhale: 'Exhale',
      'deep-breaths': 'Recovery Breaths',
      complete: 'Complete!',
    };
    return titles[phase] || 'Breathing Exercise';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.roundIndicator, { color: PHASE_COLORS[phase as keyof typeof PHASE_COLORS] }]}>
        Round {currentRound} of {totalRounds}
      </Text>

      <Text style={[styles.phaseTitle, { color: PHASE_COLORS[phase as keyof typeof PHASE_COLORS] }]}>
        {getPhaseTitle()}
      </Text>

      <Text style={styles.instruction}>
        {PHASE_INSTRUCTIONS[phase as keyof typeof PHASE_INSTRUCTIONS]}
      </Text>

      {timer !== undefined && timer > 0 && (
        <Text style={[styles.timer, { color: PHASE_COLORS[phase as keyof typeof PHASE_COLORS] }]}>
          {formatTime(timer)}
        </Text>
      )}

      {breathCount !== undefined && targetBreaths !== undefined && (
        <Text style={styles.counter}>
          Breath {breathCount} / {targetBreaths}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  roundIndicator: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  phaseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  counter: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '500',
  },
});

export default PhaseInstructions;
