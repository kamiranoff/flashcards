import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Analytics from 'appcenter-analytics';
import Share, { Options } from 'react-native-share';
import animations from '../../assets/animations';
import assets from '../../assets';
import { getPlatformDimension, WINDOW_WIDTH } from '../../utils/device';
import { Container, PrimaryButton, AppText } from '../../common';
import { analytics, theme } from '../../utils';
import { sentInviteToFriends } from '../../redux/user/actions';
import { RootState } from '../../redux/store';
import { DrawerStackParamList, Screens } from '../../navigation/interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { addFreeDeck } from '../../redux/decks/actions';

const options: Options = {
  url: 'https://myflashcards.app',
  message: 'Check out a new app called MyFlashCards',
  title: '',
  subject: 'Learn with Flashcards App',
  saveToFiles: false,
};

type GetFreebieScreenNavigationProp = StackNavigationProp<DrawerStackParamList, Screens.UPGRADE>;
interface Props {
  navigation: GetFreebieScreenNavigationProp;
}

const GetFreebie: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const handleGoToShop = () => navigation.navigate(Screens.UPGRADE);
  const handlePressInvite = () => {
    Analytics.trackEvent(analytics.getFreebie).catch(null);
    return Share.open(options)
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
        <View style={styles.content}>
          {!user.hasSentInvite ? (
            <>
              <AppText size="h1" centered>
                Wanna get a
              </AppText>
              <AppText size="h1" centered>
                free deck?
              </AppText>
              <View style={styles.spacer} />
              <AppText size="h2" centered>
                Simply send invite to your
              </AppText>
              <AppText size="h2" centered>
                friends to download the app :)
              </AppText>
              <View style={styles.buttonContainer}>
                <PrimaryButton
                  buttonText="Invite"
                  onPress={handlePressInvite}
                  buttonStyle={styles.buttonStyle}
                  buttonTextStyle={{ color: '#222' }}
                />
              </View>
            </>
          ) : (
            <View style={{ margin: 40 }}>
              <AppText size="h2" centered>
                Looks like you already invited your friends :) We are super grateful for that! Get more decks
                in our shop!
              </AppText>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleGoToShop} buttonText="Get more decks" />
              </View>
            </View>
          )}
        </View>
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
  content: {
    top: getPlatformDimension(halfWindow, halfWindow, halfWindow, halfWindow),
  },
  spacer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 60,
    width: 140,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#222',
  },
});

export default GetFreebie;
