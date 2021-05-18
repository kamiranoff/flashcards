import { Linking } from 'react-native';
import { captureException } from '@sentry/react-native';
import { Logger } from '../service/Logger';

const openLink = (url: string) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Logger.sendLocalError(new Error('Error on open URI'), 'openLink');
      captureException(new Error('Error on open URI'));
    }
  });
};

export { openLink };
