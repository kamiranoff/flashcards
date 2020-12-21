import { Button, StyleSheet, TextInput } from 'react-native';
import React, { FC, useState } from 'react';

interface Props {
  initialValue: string;
  onSubmit: (text: string) => void;
  placeholder: string;
}

const Form: FC<Props> = ({ initialValue, onSubmit, placeholder }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <>
      <TextInput style={styles.input} value={value} onChangeText={setValue} placeholder={placeholder} />
      <Button title="Save" onPress={() => onSubmit(value)} />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default Form;
