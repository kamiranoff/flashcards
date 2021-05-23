import React, { FC } from 'react';
import { Credentials } from 'react-native-auth0';
import { login, LoginProvider } from '../services/Auth0';
import { SocialButton } from './SocialButton';

interface Props {
  provider: LoginProvider;
  onSuccess: (credentials: Credentials) => void;
  onError: (e: Error) => void;
}

const Login: FC<Props> = ({ provider, onSuccess, onError }) => {
  const handleLogin = (p: LoginProvider) => login(p, onSuccess, onError);

  return (
    <SocialButton onPress={() => handleLogin(provider)} provider={provider} />
  );
};

export { Login };
