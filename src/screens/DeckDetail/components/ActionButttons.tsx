import { StyleSheet, View, GestureResponderEvent } from 'react-native';
import { PrimaryButton } from '../../../common';
import { theme } from '../../../utils';
import IconButton from '../../../common/IconButton';
import React, { FC } from 'react';

interface Props {
  navigate: () => void;
  shuffle: (event: GestureResponderEvent) => void;
}
const ActionButtons: FC<Props> = ({ navigate, shuffle }) => (
  <View style={styles.container}>
    <View style={styles.center}>
      <PrimaryButton
        onPress={navigate}
        buttonText="Play"
        buttonStyle={styles.play}
        buttonTextStyle={styles.buttonText}
      />
    </View>
    <View style={styles.iconContainer}>
      <IconButton onPress={shuffle} iconName="shuffle" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  play: {
    width: 80,
    backgroundColor: theme.colors.icon,
  },
  iconContainer: {
    position: 'absolute',
    left: 5,
    top: 3,
  },
  buttonText: {
    color: theme.colors.border,
  },
});

export default ActionButtons;
