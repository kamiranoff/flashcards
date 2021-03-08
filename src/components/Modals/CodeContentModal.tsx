import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDeckByShareId } from '../../redux/decks/actions';
import * as Analytics from 'appcenter-analytics';
import { analytics, theme } from '../../utils';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import AppText from '../../common/AppText';
import assets from '../../assets';
import PrimaryButton from '../../common/PrimaryButton';
import { isIOS } from '../../utils/device';
import { AlertScreenNavigationProp } from '../../common/AlertModal';

interface Props {
  navigation: AlertScreenNavigationProp;
}

const CodeContentModal: FC<Props> = ({ navigation }) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const handleSaveSharedDeck = async () => {
    if (code.length === 4) {
      dispatch(getDeckByShareId(code, null));
      setCode('');
      Analytics.trackEvent(analytics.addSharedDeck).catch(null);
      setTimeout(() => navigation.pop(), 300);
    }
  };
  return (
    <View style={styles.wrapper}>
      <AppText size="h2">Someone shared a deck with you?</AppText>
      <AppText size="h2">Type the code here:</AppText>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="abcd"
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 20,
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
});

export { CodeContentModal };
