// From https://github.com/react-native-community/react-native-hooks

import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { captureException } from '@sentry/react-native';
import { Logger } from '../service/Logger';

export default () => {
  const [netInfo, setNetInfo] = useState<boolean | null>(null);

  const onChange = (state: NetInfoState) => {
    setNetInfo(state.isConnected);
  };

  useEffect((): (() => void) => {
    let isSubscribed = true;
    NetInfo.fetch()
      .then((state) => (isSubscribed ? setNetInfo(state.isConnected) : null))
      .catch((error) => {
        if (isSubscribed) {
          Logger.sendLocalError(error, 'NetInfo.isConnected.fetch failed');
          captureException(error);
        }
        return null;
      });
    return (): boolean => (isSubscribed = false);
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(onChange);

    return (): void => {
      unsubscribe();
    };
  }, []);

  return netInfo;
};
