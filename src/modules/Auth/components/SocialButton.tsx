import { AppleButton } from '@invertase/react-native-apple-authentication';
import React, { FC } from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { LoginProvider } from '../services/Auth0';

interface Props {
  onPress: (event: GestureResponderEvent) => void;
  provider: LoginProvider;
}

const getLogo = (provider: LoginProvider) => {
  switch (provider) {
    case LoginProvider.FACEBOOK:
      return require('./../assets/facebook.png');
    case LoginProvider.GOOGLE:
      return require('./../assets/google-logo.png');
    default:
      return null;
  }
};

const SocialButton: FC<Props> = ({ onPress, provider }) => {
  if (provider === LoginProvider.APPLE) {
    return (
      <AppleButton
        onPress={onPress}
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={styles.appleButton}
      />
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={getLogo(provider)}
          resizeMode="contain"
        />
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
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowColor: '#333',
    elevation: 3,
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
    borderRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowColor: '#333',
    elevation: 3,
  },
});

export { SocialButton };
