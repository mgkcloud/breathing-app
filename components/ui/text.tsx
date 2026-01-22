import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

type TextSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

interface TextProps extends RNTextProps {
  size?: TextSize;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  className?: string;
}

const sizeMap: Record<TextSize, number> = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

export const Text: React.FC<TextProps> = ({
  size = 'md',
  bold = false,
  italic = false,
  underline = false,
  strikeThrough = false,
  style,
  ...props
}) => {
  return (
    <RNText
      style={[
        styles.base,
        { fontSize: sizeMap[size] },
        bold && styles.bold,
        italic && styles.italic,
        underline && styles.underline,
        strikeThrough && styles.strikeThrough,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#374151', // typography-700
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
});
