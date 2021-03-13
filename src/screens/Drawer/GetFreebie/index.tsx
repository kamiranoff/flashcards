import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Analytics from 'appcenter-analytics';
import Share from 'react-native-share';
import animations from '../../../assets/animations';
import assets from '../../../assets';
import { getPlatformDimension, WINDOW_WIDTH } from '../../../utils/device';
import { Container } from '../../../common';
import { analytics, theme } from '../../../utils';
import { sentInviteToFriends } from '../../../redux/user/actions';
import { RootState } from '../../../redux/store';
import { GetFreebieScreenNavigationProp, Screens } from '../../../navigation/types';
import { addFreeDeck } from '../../../redux/decks/actions';
import { shareOptions } from '../../../config';
import Content from './Content';

interface Props {
  navigation: GetFreebieScreenNavigationProp;
}

const GetFreebie: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const handleGoToShop = () => navigation.navigate(Screens.UPGRADE);
  const handlePressInvite = () => {
    Analytics.trackEvent(analytics.getFreebie).catch(() => null);
    return Share.open(shareOptions)
      .then(() => {
        dispatch(sentInviteToFriends());
        dispatch(addFreeDeck(1));
      })
      .catch(() => {
        // FIXME add logger
        return null;
      });
  };
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={assets.icons.bubble}
        resizeMethod="scale"
        resizeMode="cover"
        style={styles.bubbleStyle}
        imageStyle={styles.bubbleImg}>
        <Content
          hasSentInvite={user.hasSentInvite}
          handlePressInvite={handlePressInvite}
          handleGoToShop={handleGoToShop}
        />
      </ImageBackground>
      <View style={styles.animationContainer}>
        <LottieView autoPlay loop speed={1.5} source={animations.lady} style={styles.lottie} />
      </View>
    </Container>
  );
};

const halfWindow = WINDOW_WIDTH / 2;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: theme.colors.drawerItem.freeDeck,
  },
  animationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  lottie: {
    width: 120,
  },
  bubbleStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    width: WINDOW_WIDTH,
  },
  bubbleImg: {
    top: getPlatformDimension(halfWindow - 70, halfWindow - 70, halfWindow - 70, 60),
    height: '65%',
    resizeMode: 'contain',
  },
});

export default GetFreebie;
