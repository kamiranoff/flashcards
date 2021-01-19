import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import React, { FC } from 'react';
import { getPlatformDimension } from '../styles/utils';

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
    top: getPlatformDimension(10, 10, 30, 20),
    zIndex: 9,
  },
});

export default CloseButton;
