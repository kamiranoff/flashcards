import { useDispatch } from 'react-redux';
import { Auth0Credentials, Auth0UserInfo, getUserInfo } from '../../../modules/Auth';
import { Cache } from '../../../utils/Cache';
import { saveUser, saveUserAuth0Error, saveUserToDB } from '../../../redux/user/actions';

const useUserCredentials = () => {
  const dispatch = useDispatch();

  const handleUserInfoSuccess = async (u: Auth0UserInfo) => {
    dispatch(saveUser(u.sub, u.name, u.givenName, u.picture));
    dispatch(saveUserToDB());
  };

  const handleLoginSuccess = async (credentials: Auth0Credentials) => {
    if (credentials) {
      await Cache.setAccessToken(credentials.accessToken);
      await Cache.setRefreshToken(credentials.refreshToken);
      await getUserInfo(credentials.accessToken, handleUserInfoSuccess, handleError);
    }
  };

  const handleError = () => dispatch(saveUserAuth0Error);

  return {
    handleError,
    handleLoginSuccess,
  };
};

export { useUserCredentials };
