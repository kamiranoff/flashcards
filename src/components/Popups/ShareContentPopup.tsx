import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import Share from 'react-native-share';
import * as Analytics from 'appcenter-analytics';
import { selectDeckItem } from '../../redux/seclectors';
import { analytics, theme } from '../../utils';
import AppText from '../../common/AppText';
import Icon from '../../common/Icon';
import PrimaryButton from '../../common/PrimaryButton';
import { shareOptionsWithCode } from '../../config';

const ShareContentPopup = ({ deckId, handleGoBack }: { deckId: string; handleGoBack: () => void }) => {
  const deckDetail = useSelector(selectDeckItem(deckId));

  const handleSharePress = () => {
    Analytics.trackEvent(analytics.shareDeckByUser);
    return Share.open(shareOptionsWithCode(deckDetail.shareId))
      .then(handleGoBack)
      .catch(() => null);
  };

  return (
    <View style={styles.wrapper}>
      <AppText size="h2">"Sharing is caring"</AppText>
      <View style={styles.iconContainer}>
        <Icon name="happyFace2" imgStyle={styles.icon} />
      </View>
      <View style={styles.shareButtonContainer}>
        <PrimaryButton buttonText="Share your deck" onPress={handleSharePress} />
      </View>
      <View style={styles.textContent}>
        <AppText size="body" centered>
          Click the button
        </AppText>
        <View style={styles.row}>
          <AppText size="body">or share this code:</AppText>
          <TextInput
            editable={false}
            keyboardType={undefined}
            value={deckDetail.shareId}
            style={styles.codeInput}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  textContent: {
    marginTop: 20,
  },
  shareButtonContainer: {
    width: 180,
    alignSelf: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    marginVertical: 36,
  },
  icon: {
    width: 60,
    height: 60,
  },
  codeInput: {
    fontSize: 22,
    borderRadius: 4,
    marginLeft: 5,
    width: 78,
    textAlign: 'center',
    backgroundColor: theme.colors.good,
  },
});

export { ShareContentPopup };
