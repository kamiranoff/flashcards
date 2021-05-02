import Pusher from 'pusher-js/react-native';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('3cf78c17b3903fecd948', {
  cluster: 'eu',
});

export { pusher };
