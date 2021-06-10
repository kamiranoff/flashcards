import React, { FC } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { logout } from '../services/Auth0';

interface Props {
  onSuccess: () => void;
  onError: (e: Error) => void;
}

const Logout: FC<Props> = ({ onSuccess, onError }) => {
  const handleOnPress = () => logout(onSuccess, onError);

  return (
    <TouchableHighlight onPress={handleOnPress} style={styles.container}>
      <Text style={styles.text}>Logout </Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '80%',
    alignContent: 'center',
    marginVertical: 10,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowColor: '#333',
    elevation: 3,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666',
  },
});

export { Logout };
