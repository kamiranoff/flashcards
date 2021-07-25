import { useEffect, useState } from 'react';
import { captureException } from '@sentry/react-native';
import { Cache } from '../utils/Cache';
import { Logger } from '../service/Logger';

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    async function getToken() {
      const token = await Cache.getAccessToken();
      if (token) {
        return setToken(token);
      }
    }
    getToken().catch((error) => {
      Logger.sendLocalError(error, 'getToken failed');
      captureException(error);
    });
  }, []);
  return { token };
};

export { useToken };
