import React, { FC } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList, Screens } from '../../navigation/interface';
import Cards from './components/Cards';
import { isIOS, isSmallDevice, SPACING, WINDOW_HEIGHT } from '../../styles/utils';
import IconButton from '../../common/IconButton';
import { CloseButton, Container, Title } from '../../common';
import { selectDeckItem } from '../../redux/seclectors';
import { reorderCards } from '../../redux/actions';
import TopContent from './components/TopContent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DeckDetailScreenRouteProp = RouteProp<RootStackParamList, Screens.DECK_DETAIL>;

const TOP_HEADER_HEIGHT = WINDOW_HEIGHT * 0.3;

const TOP_HEADER_HEIGHT_SPACING = TOP_HEADER_HEIGHT - (isSmallDevice() ? 0 : 30);

export interface Props {
  route: DeckDetailScreenRouteProp;
}

const DeckDetail: FC<Props> = ({
  route: {
    params: { id, color },
  },
}) => {
  const insets = useSafeAreaInsets();
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
      <View style={[styles.addIcon, { top: isIOS ? insets.top : 10 }]}>
        <IconButton onPress={handleOnPress} iconName="add" />
      </View>
      <SharedElement id={`item.${id}`} style={[StyleSheet.absoluteFillObject]}>
        <View style={[StyleSheet.absoluteFillObject, styles.topView, { backgroundColor: color, zIndex: 1 }]} />
      </SharedElement>
      <Title title={deckDetail.title} />
      <TopContent
        navigate={navigateToPlayground}
        shuffle={shuffleCards}
        total={deckDetail.cards.length}
        badAnswersTotal={badAnswers}
        goodAnswersTotal={deckDetail.cards.length - badAnswers}
      />
      {isIOS ? (
        <SharedElement
          id="general.bg"
          style={[StyleSheet.absoluteFillObject, { transform: [{ translateY: WINDOW_HEIGHT + 30 }] }]}>
          <View style={[StyleSheet.absoluteFillObject, styles.dummy]}>
            <Cards cards={deckDetail.cards} deckId={id} />
          </View>
        </SharedElement>
      ) : (
        <Cards cards={deckDetail.cards} deckId={id} />
      )}
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
    zIndex: 9,
  },
  topView: {
    borderRadius: 0,
    height: TOP_HEADER_HEIGHT + 60,
  },
  dummy: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    transform: [{ translateY: -WINDOW_HEIGHT + TOP_HEADER_HEIGHT_SPACING }],
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
});

export default DeckDetail;
