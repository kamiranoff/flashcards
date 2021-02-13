import React, { FC, useState } from 'react';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import Share, { Options } from 'react-native-share';
import { RootStackParamList, Screens } from '../navigation/interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { isIOS, WINDOW_HEIGHT, WINDOW_WIDTH } from '../utils/device';
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
import { theme } from '../utils';

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
    <View style={styles.wrapper}>
      <CustomText size="h2">Someone shared a deck with you?</CustomText>
      <CustomText size="h2">Type the code here:</CustomText>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder=""
        placeholderTextColor="black"
        autoFocus
        selectionColor="black"
        maxLength={6}
      />
      <Image source={assets.icons.strokeBlack} resizeMode="contain" style={styles.stroke} />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          buttonText="Submit"
          onPress={handleSaveSharedDeck}
          hasShadow={isIOS}
          disabled={code.length < 6}
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
    url: 'https://flashcards.app',
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
      return Share.open(options).catch(() => null);
    } catch (error) {
      console.log('e', error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <CustomText size="h2">"Knowledge shared</CustomText>
      <CustomText size="h2">is knowledge squared"</CustomText>
      <View style={styles.iconContainer}>
        <Icon name="happyFace2" imgStyle={styles.icon} />
      </View>
      <View style={styles.shareButtonContainer}>
        <PrimaryButton buttonText="Share your deck" onPress={handleSharePress} />
      </View>
      <View style={{ marginTop: 10 }}>
        <CustomText size="body" centered>
          Share this code: {deckDetail.shareId}
        </CustomText>
      </View>
    </View>
  );
};

const AlertModal: FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
    height: WINDOW_HEIGHT / 2,
  },
  wrapper: {
    flex: 1,
    marginTop: 80,
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
    width: '80%',
    height: 5,
    resizeMode: 'contain',
  },
  input: {
    marginTop: 40,
    height: 40,
    fontSize: 18,
    borderRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
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

export default AlertModal;
