import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../../../common';

type Props = {
  totalCards: number;
  correctAnswers: number;
};

const BottomContent: FC<Props> = ({ totalCards, correctAnswers }) => {
  return (
    <View style={styles.container}>
      <AppText size="p">
        {totalCards} {`card${totalCards === 1 ? '' : 's'}`}
      </AppText>
      <AppText size="p">
        {correctAnswers} / {totalCards}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 5,
    justifyContent: 'space-between',
  },
});

export { BottomContent };
