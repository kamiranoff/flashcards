import React, { forwardRef } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../../utils';
import CardItem from './CardItem';
import { width } from '../../../utils/device';
import { Screens } from '../../../navigation/types';
import { NativeAlert } from '../../../common';
import { deleteCard } from '../../../redux/decks/actions';
import { Card } from '../../../redux/decks/reducer';

interface Props {
  items: Card[];
  deckId: string;
  handlerRefresh: () => void;
  isLoading: boolean;
}

export interface Ref {
  ref: any;
}

const TransitionedCards = forwardRef<Ref, Props>(({ items, deckId, handlerRefresh, isLoading }, ref) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const transition = (
    <Transition.Together>
      <Transition.Change interpolation="easeInOut" />
    </Transition.Together>
  );

  const renderRefreshControl = () => {
    return (
      <RefreshControl
        title="Refreshing"
        titleColor={theme.colors.border}
        refreshing={isLoading}
        onRefresh={handlerRefresh}
        tintColor={theme.colors.border}
      />
    );
  };
  const children = items.map((item) => {
    const handleNavigate = () => navigate(Screens.PLAYGROUND, { deckId, cardId: item.frontendId });
    const handleDeleteCard = () => {
      NativeAlert('Are you sure you want to delete this card?', () =>
        dispatch(deleteCard(deckId, item.frontendId)),
      );
    };
    return (
      <View
        key={item.question}
        style={[styles.item, { backgroundColor: item.rank === 0 ? theme.colors.bad : theme.colors.icon }]}>
        <CardItem onPress={handleNavigate} onTrashPress={handleDeleteCard} card={item} isOwner={true} />
      </View>
    );
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={styles.container}
      refreshControl={renderRefreshControl()}>
      <Transitioning.View ref={ref} transition={transition} style={styles.row}>
        <View style={styles.wrapper}>{children}</View>
      </Transitioning.View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  item: {
    paddingHorizontal: 5,
    margin: 6,
    borderRadius: 8,
    ...theme.iconButtonShadow,
    width: width / 2 - 20,
  },
  container: {
    flexDirection: 'row',
    paddingBottom: 400, // TODO: dynamic padding bottom
  },
});

export { TransitionedCards };
