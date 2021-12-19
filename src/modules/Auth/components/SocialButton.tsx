import React, { FC } from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LoginProvider } from '../services/Auth0';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  provider: LoginProvider;
}

const getLogo = (provider: LoginProvider) => {
  switch (provider) {
    case LoginProvider.FACEBOOK:
      return require('./../assets/facebook-logo.png');
    case LoginProvider.GOOGLE:
      return require('./../assets/google.png');
    case LoginProvider.APPLE:
      return require('../assets/apple-black.png');
    default:
      return null;
  }
};

const SocialButton: FC<Props> = ({ onPress, provider }) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={styles.logo} source={getLogo(provider)} resizeMode="cover" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  logo: {
    width: 58,
    height: 58,
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

export { SocialButton };
