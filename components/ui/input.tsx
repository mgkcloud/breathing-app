import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  ViewProps,
  TouchableOpacity,
} from 'react-native';

type InputVariant = 'outline' | 'underlined' | 'rounded';
type InputSize = 'sm' | 'md' | 'lg' | 'xl';

interface InputProps extends ViewProps {
  variant?: InputVariant;
  size?: InputSize;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface InputFieldProps extends TextInputProps {
  className?: string;
}

interface InputSlotProps extends ViewProps {
  onPress?: () => void;
  className?: string;
  children: React.ReactNode;
}

const sizeHeights: Record<InputSize, number> = {
  sm: 36,
  md: 40,
  lg: 44,
  xl: 48,
};

const sizeFonts: Record<InputSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

// Context to pass input props to children
const InputContext = React.createContext<{
  variant: InputVariant;
  size: InputSize;
  isDisabled: boolean;
}>({
  variant: 'outline',
  size: 'md',
  isDisabled: false,
});

export const Input: React.FC<InputProps> = ({
  variant = 'outline',
  size = 'md',
  isInvalid = false,
  isDisabled = false,
  style,
  children,
  ...props
}) => {
  const height = sizeHeights[size];

  const containerStyle = [
    styles.container,
    { height },
    variant === 'outline' && styles.outline,
    variant === 'underlined' && styles.underlined,
    variant === 'rounded' && styles.rounded,
    isInvalid && styles.invalid,
    isDisabled && styles.disabled,
    style,
  ];

  return (
    <InputContext.Provider value={{ variant, size, isDisabled }}>
      <View style={containerStyle} {...props}>
        {children}
      </View>
    </InputContext.Provider>
  );
};

export const InputField: React.FC<InputFieldProps> = ({ style, ...props }) => {
  const { size, isDisabled } = React.useContext(InputContext);
  const fontSize = sizeFonts[size];

  return (
    <TextInput
      style={[styles.field, { fontSize }, style]}
      editable={!isDisabled}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
};

export const InputSlot: React.FC<InputSlotProps> = ({
  onPress,
  children,
  style,
  ...props
}) => {
  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.slot, style]}
        onPress={onPress}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.slot, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
  },
  outline: {
    borderWidth: 1,
    borderRadius: 8,
  },
  underlined: {
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  rounded: {
    borderWidth: 1,
    borderRadius: 24,
  },
  invalid: {
    borderColor: '#ef4444',
  },
  disabled: {
    opacity: 0.4,
  },
  field: {
    flex: 1,
    paddingHorizontal: 12,
    color: '#1f2937',
  },
  slot: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
