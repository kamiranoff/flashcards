import React, { FC } from 'react';
import { GestureResponderEvent, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
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
      return require('./../assets/google-plus-logo.png');
    default:
      return null;
  }
};

const SocialButton: FC<Props> = ({ onPress, provider }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
      <Image style={styles.logo} source={getLogo(provider)} resizeMode="contain" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    marginRight: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
  },
  logo: {
    position: 'absolute',
    width: 28,
    height: 28,
  },
});

export { SocialButton };
