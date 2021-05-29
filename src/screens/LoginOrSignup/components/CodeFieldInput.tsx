import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export const CELL_COUNT = 4;

type Props = {
  verificationCode: string;
  setVerificationCode: (code: string) => void;
};

const CodeFieldInput: FC<Props> = ({ verificationCode, setVerificationCode }) => {
  const ref = useBlurOnFulfill({ value: verificationCode, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verificationCode,
    setValue: setVerificationCode,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={verificationCode}
      onChangeText={setVerificationCode}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 0,
  },
  sendText: {
    color: '#FFF',
  },
  cell: {
    width: 70,
    height: 70,
    lineHeight: 60,
    fontSize: 30,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    backgroundColor: 'white',
  },
  focusCell: {
    borderWidth: 5,
    borderColor: 'black',
  },
});

export { CodeFieldInput };
