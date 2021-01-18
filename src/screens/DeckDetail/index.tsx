import React, { FC } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList, Screens } from '../../navigation/interface';
import Cards from './components/Cards';
import { getPlatformDimension, moderateScale, SPACING, WINDOW_HEIGHT } from '../../styles/utils';
import CustomText from '../../common/CustomText';
import IconButton from '../../common/IconButton';
import { CloseButton, Container, Title } from '../../common';
import { selectDeckItem } from '../../redux/seclectors';
import { reorderCards } from '../../redux/actions';

type DeckDetailScreenRouteProp = RouteProp<RootStackParamList, Screens.DECK_DETAIL>;

const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;

export interface Props {
  route: DeckDetailScreenRouteProp;
}

const DeckDetail: FC<Props> = ({
  route: {
    params: { id, color },
  },
}) => {
  const dispatch = useDispatch();
  const deckDetail = useSelector(selectDeckItem(id));
  const { navigate, goBack } = useNavigation();

  const handleOnPress = () => navigate(Screens.QUESTION_MODAL, { title: deckDetail.title, deckId: id });
  const badAnswers = deckDetail.cards.filter((c) => c.rank === 0).length;

  const navigateToPlayground = () => navigate(Screens.PLAYGROUND, { deckId: id, cardId: deckDetail.cards[0].id });
  const shuffleCards = () => dispatch(reorderCards(id));

  return (
    <Container>
      <CloseButton onPress={goBack} />
      <View style={styles.addIcon}>
        <IconButton onPress={handleOnPress} iconName="add" />
      </View>
      <SharedElement id={`item.${id}`} style={[StyleSheet.absoluteFillObject]}>
        <View style={[StyleSheet.absoluteFillObject, styles.topView, { backgroundColor: color, zIndex: 1 }]} />
      </SharedElement>
      <Title title={deckDetail.title} />
      <View style={styles.content}>
        <CustomText size="h2">Total: {deckDetail.cards.length} cards</CustomText>
        <CustomText size="h2">You need to practice with {badAnswers} cards</CustomText>
        <CustomText size="h2">Good answers: {deckDetail.cards.length - badAnswers} cards</CustomText>
        <View style={styles.actionButtons}>
          <IconButton onPress={navigateToPlayground} iconName="play" />
          <IconButton onPress={shuffleCards} iconName="play" />
        </View>
      </View>
      <SharedElement id="general.bg" style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT + 10 }] }, { zIndex: 99 }]}>
        <View style={[StyleSheet.absoluteFillObject, styles.dummy]}>
          <Cards cards={deckDetail.cards} deckId={id} />
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
  addIcon: {
    right: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 10, 40, 20),
    zIndex: 9,
  },
  topView: {
    borderRadius: 0,
    height: TOP_HEADER_HEIGHT + 20,
  },
  content: {
    zIndex: 1,
    marginTop: moderateScale(30),
    marginHorizontal: SPACING,
  },
  dummy: {
    flex: 1,
    zIndex: 99999,
    position: 'relative',
    backgroundColor: 'white',
    transform: [{ translateY: -WINDOW_HEIGHT + TOP_HEADER_HEIGHT - 24 }],
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: SPACING,
    paddingHorizontal: 5,
    paddingBottom: SPACING + 10,
  },
  center: {
    marginTop: 10,
    alignSelf: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default DeckDetail;
