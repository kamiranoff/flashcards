import SInfo from 'react-native-sensitive-info';

enum CacheConstants {
  ACCESS_TOKEN = 'MyFlashcardsToken',
  KEY_CHAIN = 'MyFlashcardsKeychain',
  SHARED_PREFERENCES = 'MyFlashcardsSharedPreferences',
  REFRESH_TOKEN = 'MyFlashcardsRefreshToken',
}

const sInfoOptions = {
  sharedPreferencesName: CacheConstants.SHARED_PREFERENCES,
  keychainService: CacheConstants.KEY_CHAIN,
};

class Cache {
  private static get = (key: string): Promise<string> =>
    SInfo.getItem(key, sInfoOptions);

  private static set = (key: string, value: string): Promise<null> =>
    SInfo.setItem(key, value, sInfoOptions);

  private static remove = (key: string): Promise<null> =>
    SInfo.deleteItem(key, sInfoOptions);

  static setAccessToken = async (accessToken: string) => {
    try {
      await Cache.set(CacheConstants.ACCESS_TOKEN, accessToken);
    } catch (e) {
      console.warn('Cannot set access token', e);
    }
  };

  static getAccessToken = () => {
    try {
      return Cache.get(CacheConstants.ACCESS_TOKEN);
    } catch (e) {
      console.warn('Cannot get access token', e);
      return null;
    }
  };

  static setRefreshToken = async (token: string) => {
    try {
      await Cache.set(CacheConstants.REFRESH_TOKEN, token);
    } catch (e) {
      console.warn('Cannot set access token', e);
    }
  };

  static deleteTokens = async () => {
    try {
      await Cache.remove(CacheConstants.ACCESS_TOKEN);
      await Cache.remove(CacheConstants.REFRESH_TOKEN);
    } catch (e) {
      console.warn('Cannot delete tokens', e);
    }
  };

  static getRefreshToken = async () => {
    try {
      return await Cache.get(CacheConstants.REFRESH_TOKEN);
    } catch (e) {
      console.warn('Cannot get refresh token', e);
      return null;
    }
  };
}

export { Cache };
