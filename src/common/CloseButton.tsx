import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import React, { FC } from 'react';
import { moderateScale } from '../styles/utils';

interface Props {
  onPress: (e: GestureResponderEvent) => void;
}

const CloseButton: FC<Props> = ({ onPress }) => (
  <View style={styles.container}>
    <IconButton onPress={onPress} iconName="close" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    left: 10,
    position: 'absolute',
    top: moderateScale(40),
    zIndex: 999,
  },
});

export default CloseButton;
