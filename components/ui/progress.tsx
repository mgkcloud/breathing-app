import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ProgressOrientation = 'horizontal' | 'vertical';

interface ProgressProps extends ViewProps {
  value: number;
  size?: ProgressSize;
  orientation?: ProgressOrientation;
  className?: string;
  children?: React.ReactNode;
}

interface ProgressFilledTrackProps extends ViewProps {
  className?: string;
}

const sizeHeights: Record<ProgressSize, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
};

// Context to pass progress props to children
const ProgressContext = React.createContext<{
  value: number;
  size: ProgressSize;
  orientation: ProgressOrientation;
}>({
  value: 0,
  size: 'md',
  orientation: 'horizontal',
});

export const Progress: React.FC<ProgressProps> = ({
  value,
  size = 'md',
  orientation = 'horizontal',
  style,
  children,
  ...props
}) => {
  const height = sizeHeights[size];

  return (
    <ProgressContext.Provider value={{ value, size, orientation }}>
      <View
        style={[
          styles.container,
          orientation === 'horizontal'
            ? { height, width: '100%' }
            : { width: height, height: '100%' },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </ProgressContext.Provider>
  );
};

export const ProgressFilledTrack: React.FC<ProgressFilledTrackProps> = ({
  style,
  ...props
}) => {
  const { value, size, orientation } = React.useContext(ProgressContext);
  const height = sizeHeights[size];

  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <View
      style={[
        styles.filledTrack,
        orientation === 'horizontal'
          ? { height, width: `${clampedValue}%` }
          : { width: height, height: `${clampedValue}%` },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d1d5db', // background-300
    borderRadius: 9999,
    overflow: 'hidden',
  },
  filledTrack: {
    backgroundColor: '#3b82f6', // primary-500
    borderRadius: 9999,
  },
});
