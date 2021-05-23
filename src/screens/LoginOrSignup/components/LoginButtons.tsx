import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Auth0Credentials, Auth0UserInfo, Login, LoginProvider } from '../../../modules/Auth';

type Props = {
  user: Auth0UserInfo | null;
  onSuccess: (credentials: Auth0Credentials) => void;
  onError: (credentials: Error) => void;
};

const LoginButtons: FC<Props> = ({ user, onSuccess, onError }) => {
  if (user) {
    return null;
  }

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
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '80%',
    alignContent: 'center',
    marginVertical: 20,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowColor: '#333',
    elevation: 3,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export { LoginButtons };
