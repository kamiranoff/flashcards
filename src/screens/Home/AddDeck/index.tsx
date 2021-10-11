import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Animated, StyleSheet } from 'react-native';
import * as Analytics from 'appcenter-analytics';
import { CloseButton } from '../../../common';
import { saveDeck } from '../../../redux/decks/actions';
import { getPlatformDimension, isIOS } from '../../../utils/device';
import { selectAllDecks, selectMaxFreeDecks } from '../../../redux/seclectors';
import { AddDeckContent } from './AddDeckContent';
import { NoMoreFreeDecksContent } from './NoMoreFreeDecksContent';
import { AddDeckScreenNavigationProp, Screens } from '../../../navigation/types';
import { analytics } from '../../../utils';

export interface Props {
  navigation: AddDeckScreenNavigationProp;
}

const AddDeck: FC<Props> = ({ navigation }) => {
  const maxFreeDecks = useSelector(selectMaxFreeDecks);
  const decks = useSelector(selectAllDecks);
  const numberOfDecksNotShared = Object.values(decks).filter((deck) => !deck.sharedWithYou).length;
  const [canAddDeck, setCanAddDeck] = useState(numberOfDecksNotShared < maxFreeDecks);
  const [newTitle, setNewTitle] = useState('');
  const opacityVal = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    setCanAddDeck(numberOfDecksNotShared < maxFreeDecks);
  }, []);

  useEffect(() => {
    Animated.timing(opacityVal, {
      toValue: 1,
      delay: 500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacityVal]);
  const handleSaveDeck = () => {
    Analytics.trackEvent(analytics.createNewDeck);
    const newId = String(Date.now());
    if (newTitle) {
      dispatch(saveDeck(newId, newTitle));
      setTimeout(() => navigation.goBack(), 200);
    }
  };

  const handleGoToShop = () => navigation.navigate(Screens.UPGRADE_TO_PRO_MODAL);

  return (
    <View style={styles.container}>
      <View style={styles.offset}>
        <CloseButton onPress={() => navigation.goBack()} />
      </View>
      <Animated.View style={[{ opacity: isIOS ? opacityVal : 1 }, styles.content]}>
        {canAddDeck ? (
          <AddDeckContent
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            onSave={handleSaveDeck}
            nbDecks={maxFreeDecks - numberOfDecksNotShared}
          />
        ) : (
          <NoMoreFreeDecksContent onNavigate={handleGoToShop} />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignContent: 'center',
  },
  content: {
    paddingHorizontal: 10,
    marginTop: getPlatformDimension(120, 120, 140, 160),
  },
  offset: {
    marginLeft: 6,
  },
});

export default AddDeck;
