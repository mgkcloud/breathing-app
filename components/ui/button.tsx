import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

type ButtonAction = 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
type ButtonVariant = 'solid' | 'outline' | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends TouchableOpacityProps {
  action?: ButtonAction;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface ButtonTextProps {
  children: React.ReactNode;
  style?: any;
  className?: string;
}

interface ButtonSpinnerProps {
  color?: string;
}

interface ButtonGroupProps {
  children: React.ReactNode;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isAttached?: boolean;
  flexDirection?: 'row' | 'column';
  style?: any;
}

const actionColors: Record<ButtonAction, { bg: string; border: string; text: string }> = {
  primary: { bg: '#3b82f6', border: '#93c5fd', text: '#ffffff' },
  secondary: { bg: '#6b7280', border: '#d1d5db', text: '#ffffff' },
  positive: { bg: '#22c55e', border: '#86efac', text: '#ffffff' },
  negative: { bg: '#ef4444', border: '#fca5a5', text: '#ffffff' },
  default: { bg: 'transparent', border: 'transparent', text: '#374151' },
};

const sizeStyles: Record<ButtonSize, { paddingHorizontal: number; height: number; fontSize: number }> = {
  xs: { paddingHorizontal: 14, height: 32, fontSize: 12 },
  sm: { paddingHorizontal: 16, height: 36, fontSize: 14 },
  md: { paddingHorizontal: 20, height: 40, fontSize: 16 },
  lg: { paddingHorizontal: 24, height: 44, fontSize: 18 },
  xl: { paddingHorizontal: 28, height: 48, fontSize: 20 },
};

const spaceMap: Record<string, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

// Context to pass button props to children
const ButtonContext = React.createContext<{
  action: ButtonAction;
  variant: ButtonVariant;
  size: ButtonSize;
}>({
  action: 'primary',
  variant: 'solid',
  size: 'md',
});

export const Button: React.FC<ButtonProps> = ({
  action = 'primary',
  variant = 'solid',
  size = 'md',
  isDisabled = false,
  style,
  children,
  ...props
}) => {
  const colors = actionColors[action];
  const sizeStyle = sizeStyles[size];

  const buttonStyle = [
    styles.base,
    {
      paddingHorizontal: sizeStyle.paddingHorizontal,
      height: sizeStyle.height,
    },
    variant === 'solid' && { backgroundColor: colors.bg },
    variant === 'outline' && {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.bg,
    },
    variant === 'link' && { backgroundColor: 'transparent', paddingHorizontal: 0 },
    isDisabled && styles.disabled,
    style,
  ];

  return (
    <ButtonContext.Provider value={{ action, variant, size }}>
      <TouchableOpacity
        style={buttonStyle}
        disabled={isDisabled}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    </ButtonContext.Provider>
  );
};

export const ButtonText: React.FC<ButtonTextProps> = ({ children, style }) => {
  const { action, variant, size } = React.useContext(ButtonContext);
  const colors = actionColors[action];
  const sizeStyle = sizeStyles[size];

  const textColor = variant === 'solid' ? colors.text : colors.bg;

  return (
    <Text
      style={[
        styles.buttonText,
        { fontSize: sizeStyle.fontSize, color: textColor },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ color = '#ffffff' }) => {
  return <ActivityIndicator size="small" color={color} />;
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  space = 'md',
  isAttached = false,
  flexDirection = 'row',
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection,
          gap: isAttached ? 0 : spaceMap[space],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 8,
  },
  disabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontWeight: '600',
  },
});
