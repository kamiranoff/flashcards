import { useEffect } from 'react';
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';

const showInterstitialAd = (adId: string) => {
  // Create a new instance
  const interstitialAd = InterstitialAd.createForAdRequest(adId);

  // Add event handlers
  interstitialAd.onAdEvent((type, error) => {
    if (error) {
      // TODO: sentry
      console.log('error', error);
      return undefined;
    }
    if (type === AdEventType.LOADED) {
      interstitialAd.show();
    }
  });

  // Load a new advert
  interstitialAd.load();
};

const useInterstitialAd = (adId: string) => {
  useEffect(() => {
    if (!adId) {
      return undefined;
    }

    showInterstitialAd(adId);
  }, [adId]);
};

export { useInterstitialAd };
