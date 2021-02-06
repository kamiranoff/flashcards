import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme, typography } from '../utils';

// FIXME
interface Props {
  onPress: () => void;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  buttonText: string;
  disabled?: boolean;
  hasShadow?: boolean;
}

const PrimaryButton = ({
  onPress,
  buttonStyle,
  buttonTextStyle,
  buttonText,
  disabled = false,
  hasShadow = true,
}: Props) => (
  <TouchableOpacity
    disabled={disabled}
    activeOpacity={0.6}
    style={[
      styles.button,
      { ...buttonStyle },
      hasShadow ? theme.buttonShadow : {},
      disabled ? styles.disabled : {},
    ]}
    onPress={onPress}>
    <Text style={[styles.text, { ...buttonTextStyle }, disabled ? { color: '#fff' } : {}]}>{buttonText}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 8,
    backgroundColor: theme.colors.buttonBackground,
  },
  text: {
    ...typography.button,
    color: theme.colors.buttonText,
  },
  disabled: {
    backgroundColor: theme.colors.lightBorder,
  },
});

export default PrimaryButton;
