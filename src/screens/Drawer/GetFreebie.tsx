import React from 'react';
import CustomText from '../../common/CustomText';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Analytics from 'appcenter-analytics';
import Share, { Options } from 'react-native-share';
import animations from '../../assets/animations';
import assets from '../../assets';
import { getPlatformDimension, WINDOW_WIDTH } from '../../utils/device';
import { Container, PrimaryButton } from '../../common';
import { analytics, theme } from '../../utils';

const options: Options = {
  url: 'https://myflashcards.app',
  message: 'Check out a new app called MyFlashCards',
  title: '',
  subject: 'Learn with Flashcards App',
  saveToFiles: false,
};

const GetFreebie = () => {
  return (
    <Container style={styles.container}>
      <ImageBackground
        source={assets.icons.bubble}
        resizeMethod="scale"
        resizeMode="cover"
        style={styles.bubbleStyle}
        imageStyle={styles.bubbleImg}>
        <View style={styles.content}>
          <CustomText size="h2" centered>
            Wanna get an extra
          </CustomText>
          <CustomText size="h2" centered>
            free deck?
          </CustomText>
          <View style={styles.spacer} />
          <CustomText size="h2" centered>
            Simply send invite to your
          </CustomText>
          <CustomText size="h2" centered>
            friends :)
          </CustomText>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              buttonText="Invite"
              onPress={() => {
                Analytics.trackEvent(analytics.getFreebie).catch(null);
                Share.open(options).catch(() => null);
              }}
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={{ color: '#222' }}
            />
          </View>
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
    width: 120,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#222',
  },
});

export default GetFreebie;
