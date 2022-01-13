import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isLargeDevice, WINDOW_WIDTH } from '../../utils/device';
import { Card } from '../../redux/decks/reducer';
import { Screens } from '../../navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CardContent } from './CardContent';
import { ReanimatedFlip } from '../../common';

const ITEM_SIZE = isLargeDevice() ? WINDOW_WIDTH : WINDOW_WIDTH * 0.9;

interface Props {
  card: Card;
  title: string;
  deckId: string;
  isShared: boolean;
}

const CardItem: FC<Props> = ({ card, title, deckId, isShared }) => {
  const [side, setSide] = React.useState<0 | 1>(0);
  const navigation = useNavigation();
  const { sub } = useSelector((state: RootState) => state.user);

  const flipCard = () => {
    setSide((_side) => (_side === 0 ? 1 : 0));
  };

  const handleEdit = () => {
    if (isShared && !sub) {
      return navigation.navigate(Screens.LOGIN_OR_SIGNUP);
    }
    const params = {
      title,
      deckId,
      cardId: card.frontendId,
      fromPlayground: true,
    };
    return side === 0
      ? navigation.navigate(Screens.QUESTION_MODAL, params)
      : navigation.navigate(Screens.ANSWER_MODAL, params);
  };

  return (
    <View style={styles.innerContainer}>
      <ReanimatedFlip
        side={side}
        front={<CardContent title="Question" text={card.question} onPress={flipCard} onEdit={handleEdit} />}
        back={<CardContent title="Answer" text={card.answer} onPress={flipCard} onEdit={handleEdit} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    height: ITEM_SIZE * 1.4 + 5,
    margin: 0,
  },
});

export default CardItem;
