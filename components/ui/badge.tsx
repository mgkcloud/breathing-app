import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';

type BadgeAction = 'error' | 'warning' | 'success' | 'info' | 'muted';
type BadgeVariant = 'solid' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends ViewProps {
  action?: BadgeAction;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
}

interface BadgeTextProps {
  children: React.ReactNode;
  style?: any;
  className?: string;
}

const actionColors: Record<BadgeAction, { bg: string; border: string; text: string }> = {
  error: { bg: '#fee2e2', border: '#fca5a5', text: '#b91c1c' },
  warning: { bg: '#fef3c7', border: '#fcd34d', text: '#d97706' },
  success: { bg: '#dcfce7', border: '#86efac', text: '#15803d' },
  info: { bg: '#dbeafe', border: '#93c5fd', text: '#1d4ed8' },
  muted: { bg: '#f3f4f6', border: '#d1d5db', text: '#4b5563' },
};

const sizePadding: Record<BadgeSize, { paddingHorizontal: number; paddingVertical: number }> = {
  sm: { paddingHorizontal: 8, paddingVertical: 2 },
  md: { paddingHorizontal: 12, paddingVertical: 4 },
  lg: { paddingHorizontal: 16, paddingVertical: 6 },
};

const sizeFonts: Record<BadgeSize, number> = {
  sm: 10,
  md: 12,
  lg: 14,
};

// Context for passing badge props to children
const BadgeContext = React.createContext<{
  action: BadgeAction;
  size: BadgeSize;
}>({
  action: 'info',
  size: 'md',
});

export const Badge: React.FC<BadgeProps> = ({
  action = 'info',
  variant = 'solid',
  size = 'md',
  style,
  children,
  ...props
}) => {
  const colors = actionColors[action];
  const padding = sizePadding[size];

  return (
    <BadgeContext.Provider value={{ action, size }}>
      <View
        style={[
          styles.badge,
          {
            paddingHorizontal: padding.paddingHorizontal,
            paddingVertical: padding.paddingVertical,
          },
          variant === 'solid' && { backgroundColor: colors.bg },
          variant === 'outline' && {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </BadgeContext.Provider>
  );
};

export const BadgeText: React.FC<BadgeTextProps> = ({ children, style }) => {
  const { action, size } = React.useContext(BadgeContext);
  const colors = actionColors[action];
  const fontSize = sizeFonts[size];

  return (
    <Text style={[styles.badgeText, { color: colors.text, fontSize }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  badgeText: {
    fontWeight: '500',
  },
});
