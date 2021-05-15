import { StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../../../common';
import { theme } from '../../../utils';
import React, { FC } from 'react';

interface Props {
  navigate: () => void;
}
const ActionButtons: FC<Props> = ({ navigate }) => (
  <View style={styles.container}>
    <PrimaryButton
      onPress={navigate}
      buttonText="Play"
      buttonStyle={styles.play}
      buttonTextStyle={styles.buttonText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  play: {
    width: 80,
    backgroundColor: theme.colors.icon,
  },
  buttonText: {
    color: theme.colors.border,
  },
});

export default ActionButtons;
