import { AppText, PrimaryButton } from '../../../common';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { getPlatformDimension, WINDOW_WIDTH } from '../../../utils/device';

interface Props {
  hasSentInvite: boolean;
  handlePressInvite: (e: GestureResponderEvent) => void;
  handleGoToShop: (e: GestureResponderEvent) => void;
}

const Content: FC<Props> = ({ hasSentInvite, handlePressInvite, handleGoToShop }) => (
  <View style={styles.content}>
    {!hasSentInvite ? (
      <>
        <AppText size="h1" centered>
          Wanna get a free deck?
        </AppText>
        <View style={styles.spacer} />
        <AppText size="h2" centered>
          Simply send invite to your
        </AppText>
        <AppText size="h2" centered>
          friends, that's it :)
        </AppText>
        <PrimaryButton buttonText="Invite" onPress={handlePressInvite} buttonStyle={styles.buttonContainer} />
      </>
    ) : (
      <View style={{ margin: 40 }}>
        <AppText size="h2" centered>
          Looks like you've already invited your friends :) We are super grateful for that! Get more decks in
          our shop!
        </AppText>
        <PrimaryButton
          onPress={handleGoToShop}
          buttonText="Get more decks"
          buttonStyle={styles.buttonContainer}
        />
      </View>
    )}
  </View>
);
const halfWindow = WINDOW_WIDTH / 2;
const styles = StyleSheet.create({
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
});

export default Content;
