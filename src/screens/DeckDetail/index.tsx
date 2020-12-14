import React, { FC } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { RootStackParamList, Screens } from '../../navigation/interface';
import { selectDeckItem } from 'modules/DecksList/redux/seclectors';
import Cards from './components/Cards';
import { WINDOW_HEIGHT } from '../../styles/utils';

type DeckDetailScreenRouteProp = RouteProp<RootStackParamList, Screens.DECK_DETAIL>;

const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;

export interface Props {
  route: DeckDetailScreenRouteProp;
}

const DeckDetail: FC<Props> = ({ route: { params } }) => {
  const deckDetail = useSelector(selectDeckItem(params.id));
  const { navigate, goBack } = useNavigation();
  const handleOnPress = () => navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: params.id });

  return (
    <SafeAreaView style={styles.container}>
      <SharedElement id={`item.${params.id}`} style={[StyleSheet.absoluteFillObject]}>
        <View
          style={[StyleSheet.absoluteFillObject, { backgroundColor: params.color, borderRadius: 0, height: TOP_HEADER_HEIGHT }]}
        />
      </SharedElement>
      <TouchableOpacity onPress={goBack} style={styles.btn}>
        <Text>Go back</Text>
      </TouchableOpacity>
      <Text>{deckDetail.title}</Text>
      <SharedElement id="general.bg" style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT }] }]}>
        <View style={[StyleSheet.absoluteFillObject, styles.dummy]}>
          <Text>Your cards</Text>
          <Cards cards={deckDetail.cards} deckId={params.id} />
        </View>
      </SharedElement>
      <Button title="Add new card" onPress={handleOnPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  btn: {
    position: 'absolute',
    top: 30,
    backgroundColor: 'red',
    zIndex: 999,
  },
  dummy: {
    backgroundColor: 'white',
    transform: [{ translateY: -WINDOW_HEIGHT + TOP_HEADER_HEIGHT - 20 }],
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});

export default DeckDetail;
