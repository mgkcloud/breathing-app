import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

interface HeadingProps extends RNTextProps {
  size?: HeadingSize;
  className?: string;
}

const sizeMap: Record<HeadingSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const Heading: React.FC<HeadingProps> = ({
  size = 'lg',
  style,
  ...props
}) => {
  return (
    <RNText
      style={[
        styles.base,
        { fontSize: sizeMap[size] },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#1f2937', // typography-800
    fontWeight: 'bold',
  },
});
