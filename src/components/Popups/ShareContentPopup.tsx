import React from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import Share from 'react-native-share';
import * as Analytics from 'appcenter-analytics';
import { selectDeckItem, selectIsLoading } from '../../redux/seclectors';
import { analytics, theme } from '../../utils';
import AppText from '../../common/AppText';
import Icon from '../../common/Icon';
import PrimaryButton from '../../common/PrimaryButton';
import { shareOptionsWithCode } from '../../config';

const ShareContentPopup = ({
  error,
  deckId,
  handleGoBack,
  sub,
  handleDismissBottomSheet,
}: {
  error: string | null;
  deckId: string;
  handleGoBack: () => void;
  sub: string | null;
  handleDismissBottomSheet: () => void;
}) => {
  const deckDetail = useSelector(selectDeckItem(deckId));
  const isLoading = useSelector(selectIsLoading);

  const handleSharePress = () => {
    if (sub) {
      Analytics.trackEvent(analytics.shareDeckByUser);
      return Share.open(shareOptionsWithCode(deckDetail.shareId))
        .then(handleGoBack)
        .catch(() => null);
    } else {
      return handleDismissBottomSheet();
    }
  };

  if (isLoading) {
    return <ActivityIndicator animating={isLoading} size="large" />;
  }

  return (
    <View style={styles.wrapper}>
      <AppText size="h2">"Sharing is caring"</AppText>
      <View style={styles.iconContainer}>
        <Icon name="happyFace2" imgStyle={styles.icon} />
      </View>
      {!sub && (
        <AppText size="h2" centered textStyle={{ paddingBottom: 10 }}>
          Login to share your deck
        </AppText>
      )}
      <View style={styles.shareButtonContainer}>
        <PrimaryButton
          disabled={!!error}
          buttonText={sub ? 'Share your deck' : 'Login'}
          onPress={handleSharePress}
        />
      </View>
      {sub && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 10,
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
    marginTop: 10,
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
