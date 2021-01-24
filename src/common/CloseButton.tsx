import { GestureResponderEvent, StyleSheet, View } from 'react-native';
import IconButton from './IconButton';
import React, { FC } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIOS } from '../styles/utils';

interface Props {
  onPress: (e: GestureResponderEvent) => void;
}

const CloseButton: FC<Props> = ({ onPress }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { top: isIOS ? insets.top : 10 }]}>
      <IconButton onPress={onPress} iconName="close" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 10,
    position: 'absolute',
    zIndex: 9,
  },
});

export default CloseButton;
