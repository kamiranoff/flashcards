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
}

const PrimaryButton = ({ onPress, buttonStyle, buttonTextStyle, buttonText, disabled }: Props) => (
  <TouchableOpacity
    disabled={disabled}
    activeOpacity={0.6}
    style={[styles.button, { ...buttonStyle }]}
    onPress={onPress}>
    <Text style={[styles.text, { ...buttonTextStyle }]}>{buttonText}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    ...theme.buttonShadow,
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 8,
    backgroundColor: theme.colors.buttonBackground,
  },
  text: {
    ...typography.button,
    color: theme.colors.buttonText,
  },
});

PrimaryButton.defaultProps = {
  disabled: false,
};

export default PrimaryButton;
