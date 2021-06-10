import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Auth0Credentials, Login, LoginProvider } from '../../../modules/Auth';

type Props = {
  onSuccess: (credentials: Auth0Credentials) => void;
  onError: (credentials: Error) => void;
};

const LoginButtons: FC<Props> = ({ onSuccess, onError }) => {
  const getLoginButtons = () =>
    [LoginProvider.APPLE, LoginProvider.GOOGLE, LoginProvider.FACEBOOK].map((p) => (
      <Login provider={p} onSuccess={onSuccess} onError={onError} key={p} />
    ));

  return (
    <>
      <View style={styles.socialContainer}>{getLoginButtons()}</View>
    </>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export { LoginButtons };
