import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

interface PressableProps extends TouchableOpacityProps {
  isDisabled?: boolean;
  className?: string;
}

export const Pressable: React.FC<PressableProps> = ({
  isDisabled = false,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[isDisabled && styles.disabled, style]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.4,
  },
});
