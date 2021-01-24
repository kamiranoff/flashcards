import React, { FC, useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-native-deck-swiper';
import * as R from 'ramda';
import { RootStackParamList, Screens } from '../../navigation/interface';
import { CloseButton, Container, Title } from '../../common';
import CustomText from '../../common/CustomText';
import { selectDeckItem } from '../../redux/seclectors';
import CardItem from './Card';
import { Card } from '../../redux/reducer';
import { getPlatformDimension, isSmallDevice } from '../../utils/device';
import { scoreCard, reorderCards } from '../../redux/actions';
import { SCORES } from '../../redux/interface';
import ActionButtons from './ActionButtons';

type PlaygroundScreenRouteProp = RouteProp<RootStackParamList, Screens.PLAYGROUND>;
type PlaygroundScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.PLAYGROUND>;

export interface Props {
  route: PlaygroundScreenRouteProp;
  navigation: PlaygroundScreenNavigationProp;
}

const STACK_SIZE = 3;

const overlayButtons = {
  left: {
    title: 'Ups',
    style: {
      label: {
        backgroundColor: '#ffad8b',
        color: '#222',
        borderColor: '#222',
        borderWidth: 0.5,
        fontSize: 18,
        fontFamily: 'YuseiMagic-Regular',
      },
      wrapper: {
        zIndex: 1000,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: -20,
      },
    },
  },
  right: {
    title: 'Well done',
    style: {
      label: {
        backgroundColor: '#fbe29f',
        borderColor: '#222',
        color: '#222',
        borderWidth: 0.5,
        fontSize: 18,
        fontFamily: 'YuseiMagic-Regular',
      },
      wrapper: {
        zIndex: 1000,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
      },
    },
  },
};

const Playground: FC<Props> = ({ route: { params }, navigation: { goBack } }) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [noMoreCards, setNoMoreCards] = useState(false);
  const swiperRef = useRef<any>(null); // FIXME
  const deckDetail = useSelector(selectDeckItem(params.deckId));
  const card = R.find(R.propEq('id', params.cardId), deckDetail.cards);
  const restOfCards = R.reject(R.propEq('id', params.cardId), deckDetail.cards);
  const reOrderedCards = card ? [card, ...restOfCards] : deckDetail.cards; // First card is the one which has been clicked from deck detail

  const onSwiped = () => {
    setIndex((index + 1) % deckDetail.cards.length);
  };

  const renderCard = (item: Card) => <CardItem card={item} title={deckDetail.title} deckId={params.deckId} />;

  const onSwipeRight = () => {
    if (swiperRef) {
      swiperRef.current.swipeRight();
      const currentCard = deckDetail.cards[index];
      dispatch(scoreCard(params.deckId, currentCard.id, SCORES.GOOD));
    }
  };

  const onSwipeLeft = () => {
    swiperRef.current.swipeLeft();
    const currentCard = deckDetail.cards[index];
    dispatch(scoreCard(params.deckId, currentCard.id, SCORES.BAD));
  };

  const reShuffleCards = () => dispatch(reorderCards(params.deckId));

  const renderNoMoreCards = () => {
    const badAnswers = deckDetail.cards.filter((c) => c.rank === 0).length;

    return (
      <View>
        <CustomText size="h1" centered>
          There are no more cards
        </CustomText>
        <CustomText size="h2" centered>
          Today you answered badly: {badAnswers};
        </CustomText>
        <Button onPress={reShuffleCards} title="Re-shuffle your cards" />
      </View>
    );
  };
  const renderCards = () => {
    if (noMoreCards) {
      return renderNoMoreCards();
    }

    return (
      <Swiper
        ref={swiperRef}
        cards={reOrderedCards}
        cardIndex={index}
        renderCard={renderCard}
        backgroundColor={'transparent'}
        onSwiped={onSwiped}
        onTapCard={() => null}
        cardVerticalMargin={10}
        stackSize={STACK_SIZE}
        stackScale={10}
        verticalSwipe={false}
        stackSeparation={30}
        animateOverlayLabelsOpacity
        animateCardOpacity
        disableTopSwipe
        disableBottomSwipe
        overlayLabels={overlayButtons}
        onSwipedAll={() => setNoMoreCards(true)}
      />
    );
  };
  return (
    <Container style={{ backgroundColor: '#bedcd3'}}>
      <CloseButton onPress={goBack} />
      <Title title={deckDetail.title} />
      <View style={styles.swiperContainer}>
        {renderCards()}
        {!noMoreCards ? <ActionButtons onPressLeft={onSwipeLeft} onPressRight={onSwipeRight} /> : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  swiperContainer: {
    flex: 1,
    marginTop: isSmallDevice() ? 15 : getPlatformDimension(30, 20, 40),
  },
});

export default Playground;
