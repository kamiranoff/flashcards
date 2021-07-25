import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, StyleSheet, TextInput, View } from 'react-native';

import { saveDeck } from '../../../redux/decks/actions';
import { selectDeckItem } from '../../../redux/seclectors';
import { AppText, PrimaryButton } from '../../../common';
import assets from '../../../assets';
import { isIOS } from '../../../utils/device';
import { theme } from '../../../utils';

interface Props {
  handleGoBack: () => void;
  deckId: string;
}

const Title: FC<Props> = ({ handleGoBack, deckId }) => {
  const dispatch = useDispatch();
  const deckDetail = useSelector(selectDeckItem(deckId));
  const [newTitle, setNewTitle] = useState(deckDetail.title);

  const handleSaveDeck = () => {
    newTitle ? dispatch(saveDeck(deckId, newTitle)) : null;
    handleGoBack();
  };

  return (
    <View style={styles.wrapper}>
      <AppText size="h3">New deck title:</AppText>
      <TextInput
        blurOnSubmit
        style={styles.input}
        value={newTitle}
        onChangeText={setNewTitle}
        placeholder="New Deck Name"
        selectionColor="#222"
      />
      <Image source={assets.icons.strokeBlack} resizeMode="contain" style={styles.stroke} />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          buttonText="Save"
          onPress={handleSaveDeck}
          hasShadow={isIOS}
          disabled={!newTitle}
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
    alignItems: 'center',
  },
  stroke: {
    marginTop: isIOS ? 5 : -5,
    width: '80%',
    height: 5,
    resizeMode: 'contain',
  },
  input: {
    marginTop: 20,
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

export { Title };
