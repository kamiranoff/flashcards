import React from 'react';
import { Text, TouchableOpacity, Platform, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { GRAY_DARK, GRAY_VERY_LIGHT } from '../styles/colors';
import { FONT_FAMILY_REGULAR } from '../styles/typography';

export interface IPrimaryButtonProps {
  onPress: () => void;
  buttonStyle: ViewStyle;
  buttonTextStyle: TextStyle;
  buttonText: string;
  disabled: boolean;
}

const PrimaryButton = ({ onPress, buttonStyle, buttonTextStyle, buttonText, disabled }: IPrimaryButtonProps) => (
  <TouchableOpacity disabled={disabled} activeOpacity={0.6} style={[styles.button, { ...buttonStyle }]} onPress={onPress}>
    <Text style={[styles.buttonText, { ...buttonTextStyle }]}>{buttonText}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, 0.4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: FONT_FAMILY_REGULAR,
    fontWeight: '800',
    fontSize: 16,
    textAlign: 'center',
  },
});

PrimaryButton.defaultProps = {
  buttonStyle: { backgroundColor: GRAY_DARK },
  buttonTextStyle: { color: GRAY_VERY_LIGHT },
  disabled: false,
};

export default PrimaryButton;
