import React from 'react';
import { View, ViewProps } from 'react-native';

interface BoxProps extends ViewProps {
  className?: string;
}

export const Box: React.FC<BoxProps> = ({ className, style, ...props }) => {
  return <View style={style} {...props} />;
};
