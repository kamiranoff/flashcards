import React, { FC } from 'react';
import CustomText from '../../../common/CustomText';
import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import IconButton from '../../../common/IconButton';
import { getPlatformDimension, isSmallDevice, SPACING } from '../../../styles/utils';

interface Props {
  total: number;
  badAnswersTotal: number;
  goodAnswersTotal: number;
  navigate: (event: GestureResponderEvent) => void;
  shuffle: (event: GestureResponderEvent) => void;
}

const TopContent: FC<Props> = ({ total, badAnswersTotal, goodAnswersTotal, navigate, shuffle }) => (
  <View style={styles.content}>
    <CustomText size="h2">Total: {total} cards</CustomText>
    <CustomText size="h2">You need to practice with {badAnswersTotal} cards</CustomText>
    <CustomText size="h2">Good answers: {goodAnswersTotal} cards</CustomText>
    <View style={styles.actionButtons}>
      <IconButton onPress={navigate} iconName="play" />
      <IconButton onPress={shuffle} iconName="play" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  content: {
    zIndex: 1,
    marginTop: getPlatformDimension(25, 30, 40),
    marginHorizontal: SPACING,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: isSmallDevice() ? 15 : getPlatformDimension(20, 20, 40),
  },
});

export default TopContent;
