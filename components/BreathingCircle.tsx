import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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

  const getPhaseColor = () => {
    const colors: Record<string, string> = {
      idle: '#6366f1',
      hyperventilation: '#3b82f6',
      'breath-hold': '#8b5cf6',
      exhale: '#06b6d4',
      'deep-breaths': '#10b981',
      complete: '#22c55e',
    };
    return colors[phase] || colors.idle;
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BreathingCircle;
