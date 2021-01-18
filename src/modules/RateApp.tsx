import { Linking, NativeModules, Platform } from 'react-native';

const IOS_STORE_URL = 'itms-apps://itunes.apple.com/app/id1496618544?action=write-review';
const ANDROID_STORE_URL = 'market://details?id=com.brainsandbrawns.forkflick';

const { FlashCardsRateApp } = NativeModules;

const rateAndroid = async () => {
  try {
    await FlashCardsRateApp.requestReview();
  } catch (e) {
    Linking.openURL(ANDROID_STORE_URL).catch((err) => console.error(err, 'triggerRateAppModal error android'));
  }
};

const rateIOS = () => {
  if (FlashCardsRateApp.isAvailable) {
    return FlashCardsRateApp.requestReview();
  }
  return Linking.openURL(IOS_STORE_URL).catch((error) => {
    // TODO: implement error logger
    console.error('Some error', error);
  });
};

const RateApp = () => {
  if (Platform.OS === 'ios') {
    return rateIOS();
  }
  return rateAndroid();
};

export default RateApp;
