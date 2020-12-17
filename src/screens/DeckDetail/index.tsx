import React, { FC } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Button } from 'react-native';
import { RootStackParamList, Screens } from '../../navigation/interface';
import { selectDeckItem } from 'modules/DecksList/redux/seclectors';
import Cards from './components/Cards';
import { moderateScale, SPACING, WINDOW_HEIGHT } from '../../styles/utils';
import CustomText from '../../common/CustomText';
import IconButton from '../../common/IconButton';
import { Container } from '../../common';

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
    <Container>
      <View style={styles.backIcon}>
        <IconButton onPress={goBack} iconName="goBack" />
      </View>
      <View style={styles.addIcon}>
        <IconButton onPress={handleOnPress} iconName="add" />
      </View>
      <SharedElement id={`item.${params.id}`} style={[StyleSheet.absoluteFillObject]}>
        <View style={[StyleSheet.absoluteFillObject, styles.topView, { backgroundColor: params.color }]} />
      </SharedElement>
      <CustomText centered>{deckDetail.title}</CustomText>
      <View style={styles.content}>
        <CustomText>You have: {deckDetail.cards.length} cards</CustomText>
        <Button title="Play" onPress={() => null} />
      </View>
      <SharedElement id="general.bg" style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT }] }]}>
        <View style={[StyleSheet.absoluteFillObject, styles.dummy]}>
          <Cards cards={deckDetail.cards} deckId={params.id} />
        </View>
      </SharedElement>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  backIcon: {
    left: 10,
    position: 'absolute',
    top: moderateScale(40),
    zIndex: 999,
  },
  addIcon: {
    right: 10,
    position: 'absolute',
    top: moderateScale(40),
    zIndex: 999,
  },
  topView: {
    borderRadius: 0,
    height: TOP_HEADER_HEIGHT,
  },
  content: {
    marginTop: moderateScale(50),
    marginHorizontal: SPACING,
  },
  dummy: {
    backgroundColor: 'white',
    transform: [{ translateY: -WINDOW_HEIGHT + TOP_HEADER_HEIGHT - 20 }],
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: SPACING + 10,
    paddingHorizontal: SPACING,
  },
});

export default DeckDetail;
