import React, { FC } from 'react';
import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import { IconButton } from '../../common';
import { moderateVerticalScale } from '../../styles/utils';

interface Props {
  onPressLeft: (event: GestureResponderEvent) => void;
  onPressRight: (event: GestureResponderEvent) => void;
}

const ActionButtons: FC<Props> = ({ onPressRight, onPressLeft }) => (
  <View style={styles.container}>
    <View style={styles.buttonBar}>
      <IconButton onPress={onPressLeft} iconName="wrong" style={styles.icon} />
      <IconButton onPress={onPressRight} iconName="good" style={styles.icon} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: moderateVerticalScale(40), // FIXME - replace to dynamic value due to different devices
    right: 0,
    left: 0,
  },
  buttonBar: {
    alignSelf: 'center',
    width: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  icon: {
    width: 60,
    height: 60,
  },
});

export default ActionButtons;
