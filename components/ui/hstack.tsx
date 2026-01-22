import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

type SpaceSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

interface HStackProps extends ViewProps {
  space?: SpaceSize;
  reversed?: boolean;
  className?: string;
}

const spaceMap: Record<SpaceSize, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
};

export const HStack: React.FC<HStackProps> = ({
  space,
  reversed = false,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        styles.base,
        reversed && styles.reversed,
        space && { gap: spaceMap[space] },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reversed: {
    flexDirection: 'row-reverse',
  },
});
