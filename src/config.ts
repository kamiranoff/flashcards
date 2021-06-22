import { Options } from 'react-native-share';
import Config from 'react-native-config';

export const shareOptions: Options = {
  url: 'https://myflashcards.app',
  message: 'Check out a new app called MyFlashCards.\nStudy smarter not harder :)',
  title: '',
  subject: 'Learn with MyFlashcards',
  saveToFiles: false,
};

export const shareOptionsWithCode = (code: string): Options => ({
  url: 'https://myflashcards.app',
  message: `Learn with me :) \nUse this code: ${code} to get access to my deck`,
  title: '',
  subject: 'Learn with MyFlashCards',
  saveToFiles: false,
});

export const TERMS =
  'Payment will be charged to your iTunes Account at confirmation of purchase. Account will be ' +
  'charged for renewal within 24-hours prior to the end of the current period at your chosen ' +
  "subscription's monthly price. Subscription automatically renews unless auto-renew is turned off at " +
  'least 24-hours before the end of the current period. Subscriptions may be managed by the user and ' +
  "auto-renewal may be turned off by going to the user's Account Settings after purchase. For more " +
  'information, see our TERMS OF USE and PRIVACY POLICY.';

export const authConfig = {
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID,
  audience: Config.AUTH0_AUDIENCE,
};

export const PusherConfig = {
  apiKey: Config.PUSHER_API_KEY,
};
