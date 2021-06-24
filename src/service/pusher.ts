import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = __DEV__;
let pusher: Pusher | null = null;

export const initPusher = (appKey: string) => {
  pusher = new Pusher(appKey, {
    cluster: 'eu',
  });
};

export { pusher };
