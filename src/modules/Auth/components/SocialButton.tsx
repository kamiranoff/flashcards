// import { AppleButton } from '@invertase/react-native-apple-authentication';
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
    case LoginProvider.APPLE:
      return require('./../assets/apple-logo.png');
    default:
      return null;
  }
};

const SocialButton: FC<Props> = ({ onPress, provider }) => {
  // if (provider === LoginProvider.APPLE) {
  //   return (
  //     <AppleButton
  //       onPress={onPress}
  //       buttonStyle={AppleButton.Style.BLACK}
  //       buttonType={AppleButton.Type.SIGN_IN}
  //       style={styles.appleButton}
  //     />
  //   );
  // }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.logo} source={getLogo(provider)} resizeMode="contain" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
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
    width: 30,
    height: 30,
  },
  appleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  appleButton: {
    width: 160,
    height: 50,
  },
  apple: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'center',
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
});

export { SocialButton };
