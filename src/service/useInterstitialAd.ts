import { useEffect } from 'react';
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

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
  const { shop } = useSelector((state: RootState) => state);

  useEffect(() => {
    if (shop.remove_ads) {
      return;
    }
    if (!adId) {
      return undefined;
    }

    showInterstitialAd(adId);
  }, [adId]);
};

export { useInterstitialAd };
