import Auth0, { Credentials, UserInfo } from 'react-native-auth0';

let auth0: Auth0 | null = null;
let audience: string = '';

export const initAuth0 = (domain: string, clientId: string, auth0Audience: string) => {
  auth0 = new Auth0({
    domain,
    clientId,
  });
  audience = auth0Audience;
};

export enum LoginProvider {
  APPLE = 'apple',
  FACEBOOK = 'facebook',
  GOOGLE = 'google-oauth2',
}

const SCOPE = 'openid profile email';

type OnLoggedIn = (credentials: Credentials) => void;
type OnError = (error: Error) => void;
type OnLoggedOut = () => void;

export const login = (provider: LoginProvider, onSuccess: OnLoggedIn, onError: OnError) => {
  return auth0?.webAuth
    .authorize({
      audience,
      scope: SCOPE,
      connection: provider,
    })
    .then(onSuccess)
    .catch(onError);
};

export const sendSMS = (phoneNumber: string, onSuccess: OnLoggedIn, onError: OnError) =>
  auth0?.auth
    .passwordlessWithSMS({
      phoneNumber,
    })
    .then(onSuccess)
    .catch(onError);

export const verifyCode = (phoneNumber: string, code: string, onSuccess: OnLoggedIn, onError: OnError) =>
  auth0?.auth
    .loginWithSMS({
      phoneNumber,
      code,
      audience,
      scope: 'offline_access profile phone openid',
    })
    .then(onSuccess)
    .catch(onError);

export const logout = (onSuccess: OnLoggedOut, onError: OnError) =>
  auth0?.webAuth.clearSession().then(onSuccess).catch(onError);

export const refreshAccessToken = (refreshToken: string) => auth0?.auth.refreshToken({ refreshToken });

export const getUserInfo = (
  token: string,
  onSuccess: (user: UserInfo) => void,
  onError: (e: Error) => void,
) => auth0?.auth.userInfo({ token: token }).then(onSuccess).catch(onError);
