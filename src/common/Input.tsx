import React, { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { theme } from '../utils';

interface Props extends TextInputProps {}
const Input: FC<Props> = ({ value, onChangeText, multiline, numberOfLines = 1 }) => (
  <TextInput
    textAlignVertical="top"
    editable
    onChangeText={onChangeText}
    style={styles.input}
    numberOfLines={numberOfLines}
    multiline={multiline}
    value={value}
    blurOnSubmit
    returnKeyType="done"
    placeholderTextColor={theme.colors.placeholder}
  />
);

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    paddingVertical: 10,
    height: 200,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.border,
    fontSize: 20,
  },
});

export default Input;
