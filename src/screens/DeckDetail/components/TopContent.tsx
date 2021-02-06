import React, { FC } from 'react';
import CustomText from '../../../common/CustomText';
import { StyleSheet, View } from 'react-native';
import { getPlatformDimension, isSmallDevice, SPACING } from '../../../utils/device';
import { theme } from '../../../utils';
import { Icon } from '../../../common';

interface Props {
  total: number;
  badAnswersTotal: number;
  goodAnswersTotal: number;
}

const TopContent: FC<Props> = ({ total, badAnswersTotal, goodAnswersTotal }) => (
  <View style={styles.row}>
    <View style={styles.outerBox}>
      <Icon name="happyFace" bgColor={theme.colors.good} imgStyle={styles.iconImage} style={styles.icon} />
      <CustomText size="h1" textStyle={{ color: theme.colors.border }}>
        {goodAnswersTotal}
      </CustomText>
      <CustomText size="body" textStyle={styles.bodyText}>
        good answers
      </CustomText>
    </View>
    <View style={{ alignItems: 'center' }}>
      <CustomText size="hero" textStyle={styles.heroText}>
        {total}
      </CustomText>
      <CustomText size="body" textStyle={{ color: theme.colors.border }}>
        cards
      </CustomText>
    </View>
    <View style={styles.outerBox}>
      <Icon name="notSureFace" bgColor={theme.colors.bad} imgStyle={styles.iconImage} style={styles.icon} />
      <CustomText size="h1" textStyle={{ color: theme.colors.border }}>
        {badAnswersTotal}
      </CustomText>
      <CustomText size="body" textStyle={styles.bodyText}>
        bad answers
      </CustomText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    marginVertical: isSmallDevice() ? 15 : getPlatformDimension(25, 30, 40),
    marginHorizontal: SPACING,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  outerBox: {
    marginTop: 20,
    alignItems: 'center',
  },
  heroText: {
    fontSize: 32,
    color: theme.colors.border,
    paddingTop: -20,
  },
  bodyText: {
    marginTop: -5,
    color: theme.colors.border,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: isSmallDevice() ? 15 : getPlatformDimension(20, 20, 40),
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
});

export default TopContent;
