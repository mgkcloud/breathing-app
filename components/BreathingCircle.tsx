import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// Gluestack UI Components
import { Center } from './ui';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Gluestack Design Tokens
const colors = {
  primary500: '#3b82f6',
  secondary500: '#6366f1',
  success500: '#22c55e',
  info500: '#06b6d4',
  purple500: '#8b5cf6',
  emerald500: '#10b981',
  outline200: '#e5e7eb',
};

interface BreathingCircleProps {
  size?: number;
  phase: string;
  progress?: number;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({
  size = 300,
  phase,
  progress = 0,
}) => {
  const radius = size / 2 - 20;
  const circumference = 2 * Math.PI * radius;

  // Animation values
  const scale = useSharedValue(1);
  const strokeOffset = useSharedValue(0);

  React.useEffect(() => {
    if (phase === 'hyperventilation') {
      // Rapid breathing animation
      scale.value = withRepeat(
        withTiming(1.2, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else if (phase === 'breath-hold') {
      // Gentle hold
      scale.value = withTiming(1.1, { duration: 500 });
    } else if (phase === 'exhale') {
      // Exhale animation
      scale.value = withTiming(0.8, { duration: 2000, easing: Easing.out(Easing.ease) });
    } else if (phase === 'deep-breaths') {
      // Slow, deep breathing
      scale.value = withRepeat(
        withTiming(1.15, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      scale.value = 1;
    }
  }, [phase]);

  React.useEffect(() => {
    if (progress > 0) {
      strokeOffset.value = withTiming(
        circumference * (1 - progress),
        { duration: 300, easing: Easing.out(Easing.ease) }
      );
    } else {
      strokeOffset.value = 0;
    }
  }, [progress, circumference]);

  const animatedCircleProps = useAnimatedProps(() => ({
    r: radius * scale.value,
  }));

  const progressCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeOffset.value,
  }));

  // Phase colors using Gluestack design tokens
  const getPhaseColor = () => {
    const phaseColors: Record<string, string> = {
      idle: colors.secondary500,        // Indigo
      hyperventilation: colors.primary500, // Blue
      'breath-hold': colors.purple500,     // Purple
      exhale: colors.info500,              // Cyan
      'deep-breaths': colors.emerald500,   // Emerald
      complete: colors.success500,         // Green
    };
    return phaseColors[phase] || phaseColors.idle;
  };

  return (
    <Center style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.outline200}
          strokeWidth="8"
          fill="none"
        />

        {/* Progress circle (if applicable) */}
        {progress > 0 && (
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getPhaseColor()}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            animatedProps={progressCircleProps}
            strokeLinecap="round"
          />
        )}

        {/* Animated breathing circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getPhaseColor()}
          strokeWidth="4"
          fill="none"
          opacity={0.6}
          animatedProps={animatedCircleProps}
        />
      </Svg>
    </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default BreathingCircle;
