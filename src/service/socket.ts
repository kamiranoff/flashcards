import Pusher from 'pusher-js/react-native';
import Config from 'react-native-config';

if (__DEV__) {
  // Enable socket logging - don't include this in production
  Pusher.logToConsole = true;
}

// TODO: add variable to sh
const socket = new Pusher(Config.PUSHER_ID, {
  cluster: 'eu',
});

export { socket };
