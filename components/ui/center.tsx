import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

interface CenterProps extends ViewProps {
  className?: string;
}

export const Center: React.FC<CenterProps> = ({ style, ...props }) => {
  return <View style={[styles.base, style]} {...props} />;
};

const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
