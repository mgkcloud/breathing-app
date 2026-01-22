import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps extends ViewProps {
  orientation?: DividerOrientation;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  style,
  ...props
}) => {
  return (
    <View
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
    backgroundColor: '#e5e7eb', // outline-100
  },
  vertical: {
    width: 1,
    height: '100%',
    backgroundColor: '#e5e7eb',
  },
});
