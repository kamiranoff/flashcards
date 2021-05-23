import { Credentials, UserInfo } from 'react-native-auth0';
import { getUserInfo, LoginProvider } from './services/Auth0';
import { Login } from './components/Login';
import { Logout } from './components/Logout';

export type Auth0Credentials = Credentials;
export type Auth0UserInfo = UserInfo;

export { getUserInfo, Login, Logout, LoginProvider };
