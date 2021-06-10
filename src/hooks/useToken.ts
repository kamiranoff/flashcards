import { useEffect, useState } from 'react';
import { Cache } from '../utils/Cache';

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    async function getToken() {
      const token = await Cache.getAccessToken();
      if (token) {
        return setToken(token);
      }
    }
    getToken().catch((error) => console.log('error', error));
  }, []);
  return { token };
};

export { useToken };
