import React, { FC } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RootStackParamList, Screens } from '../../navigation/interface';
import { selectDeckItem } from 'modules/DecksList/redux/seclectors';
import Cards from './components/Cards';

type DeckDetailScreenRouteProp = RouteProp<RootStackParamList, Screens.DECK_DETAIL>;

export interface Props {
  route: DeckDetailScreenRouteProp;
}

const DeckDetail: FC<Props> = ({ route: { params } }) => {
  const deckDetail = useSelector(selectDeckItem(params.id));
  const { navigate } = useNavigation();
  const handleOnPress = () => navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: params.id });

  return (
    <View style={styles.container}>
      <Text>{deckDetail.title}</Text>
      <Text>Your cards</Text>
      <Cards cards={deckDetail.cards} deckId={params.id} />
      <Button title="Add new card" onPress={handleOnPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default DeckDetail;
