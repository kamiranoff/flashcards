import React, { FC } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Analytics from 'appcenter-analytics';
import Share, { Options } from 'react-native-share';
import { Container, PrimaryButton, AppText } from '../../common';
import assets from '../../assets';
import { getPlatformDimension } from '../../utils/device';
import { analytics } from '../../utils';
import { sentInviteToFriends } from '../../redux/user/actions';
import { RootState } from '../../redux/store';
import { addFreeDeck } from '../../redux/decks/actions';

const options: Options = {
  url: 'https://myflashcards.app',
  message: 'Check out a new app called MyFlashCards',
  title: '',
  subject: 'Learn with Flashcards App',
  saveToFiles: false,
};

const ShareTheApp: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const handlePressInvite = () => {
    Analytics.trackEvent(analytics.inviteFriends).catch(null);
    return Share.open(options)
      .then(() => {
        if (!user.hasSentInvite) {
          dispatch(sentInviteToFriends());
          dispatch(addFreeDeck(1));
        }
      })
      .catch(() => {
        return null;
      });
  };
  return (
    <Container style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={assets.icons.faces} resizeMode="contain" />
      </View>
      <View style={{ flex: 1 }}>
        <AppText centered size="h2">
          Enjoying the app?
        </AppText>
        <AppText centered size="h2">
          Share it with your friends
        </AppText>
        {!user.hasSentInvite && (
          <AppText centered size="h2">
            & get extra free deck!
          </AppText>
        )}
        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText="Share" onPress={handlePressInvite} />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1.6,
    marginLeft: 10,
    marginTop: getPlatformDimension(60, 60, 80, 100),
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    width: 120,
    alignSelf: 'center',
  },
});

export default ShareTheApp;
