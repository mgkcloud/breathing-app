import React from 'react';
import { Switch as RNSwitch, SwitchProps as RNSwitchProps, StyleSheet } from 'react-native';

interface SwitchProps extends Omit<RNSwitchProps, 'value' | 'onValueChange'> {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  isDisabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  value = false,
  onValueChange,
  isDisabled = false,
  ...props
}) => {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={isDisabled}
      trackColor={{
        false: '#d1d5db',
        true: '#93c5fd',
      }}
      thumbColor={value ? '#3b82f6' : '#f9fafb'}
      ios_backgroundColor="#d1d5db"
      {...props}
    />
  );
};
