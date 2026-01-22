import React from 'react';
import { StyleSheet } from 'react-native';
import { PHASE_COLORS, PHASE_INSTRUCTIONS } from '../constants/config';

// Gluestack UI Components
import { VStack, Text, Heading, Badge, BadgeText, Center } from './ui';

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

  const phaseColor = PHASE_COLORS[phase as keyof typeof PHASE_COLORS] || '#6366f1';

  return (
    <Center style={styles.container}>
      <VStack space="sm" style={styles.content}>
        {/* Round indicator */}
        <Badge action="muted" size="md" style={styles.roundBadge}>
          <BadgeText style={{ color: phaseColor }}>
            Round {currentRound} of {totalRounds}
          </BadgeText>
        </Badge>

        {/* Phase title */}
        <Heading size="2xl" style={[styles.phaseTitle, { color: phaseColor }]}>
          {getPhaseTitle()}
        </Heading>

        {/* Instruction text */}
        <Text size="md" style={styles.instruction}>
          {PHASE_INSTRUCTIONS[phase as keyof typeof PHASE_INSTRUCTIONS]}
        </Text>

        {/* Timer display */}
        {timer !== undefined && timer > 0 && (
          <Text size="6xl" bold style={[styles.timer, { color: phaseColor }]}>
            {formatTime(timer)}
          </Text>
        )}

        {/* Breath counter */}
        {breathCount !== undefined && targetBreaths !== undefined && (
          <Text size="lg" style={styles.counter}>
            Breath {breathCount} / {targetBreaths}
          </Text>
        )}
      </VStack>
    </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  content: {
    alignItems: 'center',
  },
  roundBadge: {
    marginBottom: 4,
    backgroundColor: '#f3f4f6',
  },
  phaseTitle: {
    textAlign: 'center',
  },
  instruction: {
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  timer: {
    marginTop: 8,
  },
  counter: {
    color: '#6b7280',
    fontWeight: '500',
  },
});

export default PhaseInstructions;
