import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import * as Analytics from 'appcenter-analytics';
import { getDeckByShareId } from '../../redux/decks/actions';
import { analytics, theme } from '../../utils';
import AppText from '../../common/AppText';
import assets from '../../assets';
import PrimaryButton from '../../common/PrimaryButton';
import { isIOS } from '../../utils/device';
import { RootState } from '../../redux/store';
import usePrevious from '../../hooks/usePrevious';
import useNetInfo from '../../hooks/useNetInfo';

interface Props {
  handleGoBack: () => void;
}

const CodeContentPopup: FC<Props> = ({ handleGoBack }) => {
  const isConnected = useNetInfo();
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const { error, decks } = useSelector((state: RootState) => state.decks);
  const [closeModal, setCloseModal] = useState(false);
  const decksNumber = Object.keys(decks).length;
  const previousDecksIds = usePrevious(decksNumber);

  useEffect(() => {
    if (previousDecksIds && decksNumber > previousDecksIds) {
      setCloseModal(true);
    }
  }, [decksNumber, previousDecksIds]);

  const handleSaveSharedDeck = async () => {
    if (code.length === 4) {
      if (isConnected) {
        dispatch(getDeckByShareId(code, null));
        setCode('');
        Analytics.trackEvent(analytics.addSharedDeck).catch(null);
      }
      // FIXME: show notification if offline
    }
  };

  if (closeModal) {
    setTimeout(() => handleGoBack(), 200);
  }
  return (
    <View style={styles.wrapper}>
      <AppText size="h2">Someone shared a deck with you?</AppText>
      <AppText size="h2">Type the code here:</AppText>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="12345"
        placeholderTextColor={theme.colors.placeholder}
        selectionColor="black"
        maxLength={4}
      />
      <Image source={assets.icons.strokeBlack} resizeMode="contain" style={styles.stroke} />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          buttonText="Submit"
          onPress={handleSaveSharedDeck}
          hasShadow={isIOS}
          disabled={code.length < 4}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={{ color: theme.colors.border }}
        />
      </View>
      {error ? (
        <AppText size="h3" textStyle={styles.error}>
          Are you sure this is the right code?
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 0,
    alignItems: 'center',
  },
  stroke: {
    width: '30%',
    height: 5,
    resizeMode: 'contain',
  },
  input: {
    marginTop: 30,
    fontSize: 18,
    borderRadius: 0,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    marginTop: 20,
    width: 120,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: theme.colors.icon,
  },
  error: {
    paddingTop: 10,
    color: theme.colors.error,
  },
  success: {
    color: theme.colors.success,
  },
});

export { CodeContentPopup };
