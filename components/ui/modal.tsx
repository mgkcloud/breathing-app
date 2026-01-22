import React from 'react';
import {
  Modal as RNModal,
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native';

type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'full';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  children: React.ReactNode;
}

interface ModalBackdropProps {
  onPress?: () => void;
}

interface ModalContentProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalHeaderProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalBodyProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalFooterProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalCloseButtonProps {
  onPress?: () => void;
  children?: React.ReactNode;
}

const sizeWidths: Record<ModalSize, string | number> = {
  xs: '60%',
  sm: '70%',
  md: '80%',
  lg: '90%',
  full: '100%',
};

// Context to pass modal props to children
const ModalContext = React.createContext<{
  size: ModalSize;
  onClose: () => void;
}>({
  size: 'md',
  onClose: () => {},
});

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  children,
}) => {
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalContext.Provider value={{ size, onClose }}>
        <View style={styles.overlay}>
          {children}
        </View>
      </ModalContext.Provider>
    </RNModal>
  );
};

export const ModalBackdrop: React.FC<ModalBackdropProps> = () => {
  const { onClose } = React.useContext(ModalContext);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.backdrop} />
    </TouchableWithoutFeedback>
  );
};

export const ModalContent: React.FC<ModalContentProps> = ({
  style,
  children,
  ...props
}) => {
  const { size } = React.useContext(ModalContext);

  return (
    <View
      style={[
        styles.content,
        { width: sizeWidths[size], maxWidth: size === 'full' ? '100%' : 510 },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <View style={[styles.body, style]} {...props}>
      {children}
    </View>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
};

export const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onPress,
  children,
}) => {
  const { onClose } = React.useContext(ModalContext);

  return (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={onPress || onClose}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    marginTop: 8,
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  closeButton: {
    padding: 4,
    borderRadius: 4,
  },
});
