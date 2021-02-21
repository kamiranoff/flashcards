import React, { FC, useState } from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import Share, { Options } from 'react-native-share';
import * as Analytics from 'appcenter-analytics';
import { RootStackParamList, Screens } from '../navigation/interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { getPlatformDimension, isIOS, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/device';
import CustomText from './CustomText';
import PrimaryButton from './PrimaryButton';
import { RouteProp } from '@react-navigation/native';
import IconButton from './IconButton';
import Icon from './Icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeckItem } from '../redux/seclectors';
import Api from '../api';
import { editSharedOnDeck, saveSharedDeck } from '../redux/actions';
import assets from '../assets';
import { analytics, theme } from '../utils';

type AlertScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ALERT>;
type AlertScreenRouteProp = RouteProp<RootStackParamList, Screens.ALERT>;

export interface Props {
  navigation: AlertScreenNavigationProp;
  route: AlertScreenRouteProp;
}

const CodeContent = ({ navigation }: { navigation: AlertScreenNavigationProp }) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const handleSaveSharedDeck = async () => {
    try {
      if (code.length === 6) {
        const response = await Api.getSharedDeckBySharedId(code);
        const id = response.data.id;
        const deck = {
          owner: response.data.owner,
          title: response.data.title,
          cards: response.data.cards,
          shareId: response.data.share_id,
          sharedByYou: false,
          sharedWithYou: true,
        };
        dispatch(saveSharedDeck(deck, id));
        setCode('');
        setTimeout(() => navigation.pop(), 300);
      }
    } catch (error) {
      // FIXME add logger
      return error;
    }
  };
  return (
    <View style={[styles.wrapper, { marginTop: 20 }]}>
      <CustomText size="h2">Someone shared a deck with you?</CustomText>
      <CustomText size="h2">Type the code here:</CustomText>
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

const ShareContent = ({ deckId }: { deckId: string }) => {
  const deckDetail = useSelector(selectDeckItem(deckId));
  const dispatch = useDispatch();
  const options: Options = {
    url: 'https://myflashcards.app',
    message: `Check out my FlashCards.\nHere is my passcode: ${deckDetail.shareId}`,
    title: 'title',
    subject: 'Learn with Flashcards App',
    saveToFiles: false,
  };
  const handleSharePress = async () => {
    try {
      if (!deckDetail.sharedByYou) {
        const res = await Api.saveDeck(deckDetail);
        if (res.data) {
          dispatch(editSharedOnDeck(deckId));
          return Share.open(options).catch(null);
        }
      }
      await Analytics.trackEvent(analytics.shareDeckByUser);
      return Share.open(options).catch(() => null);
    } catch (error) {
      console.log('e', error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <CustomText size="h2">"Sharing is caring"</CustomText>
      <View style={styles.iconContainer}>
        <Icon name="happyFace2" imgStyle={styles.icon} />
      </View>
      <View style={styles.shareButtonContainer}>
        <PrimaryButton buttonText="Share your deck" onPress={handleSharePress} />
      </View>
      <View style={{ marginTop: 20 }}>
        <CustomText size="body" centered>
          Click the button
        </CustomText>
        <View style={{ flexDirection: 'row' }}>
          <CustomText size="body">or share this code:</CustomText>
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

const AlertModal: FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          params.modalTemplate === 'codeModal'
            ? { height: WINDOW_HEIGHT / 3 }
            : { height: WINDOW_HEIGHT / getPlatformDimension(2, 2, 2.5) },
        ]}>
        <View style={styles.closeButton}>
          <IconButton onPress={() => navigation.pop()} iconName="x" />
        </View>
        {params.modalTemplate === 'shareModal' ? (
          <ShareContent deckId={params.deckId} />
        ) : (
          <CodeContent navigation={navigation} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    left: -10,
    position: 'absolute',
    top: -10,
    zIndex: 9,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 6,
    width: WINDOW_WIDTH - 30, // FIXME width tablets??
    height: WINDOW_HEIGHT / 3,
  },
  wrapper: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
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
  codeInput: {
    fontSize: 18,
    borderRadius: 4,
    marginLeft: 5,
    paddingHorizontal: 4,
    width: 60,
    backgroundColor: theme.colors.placeholder,
  },
});

export default AlertModal;
