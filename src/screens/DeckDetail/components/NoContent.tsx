import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { NoContentInfo, PrimaryButton } from '../../../common';
import { theme } from '../../../utils';
import { WINDOW_HEIGHT } from '../../../utils/device';

interface Props {
  hasCards: boolean;
  onPress: () => void;
}

const NoContentOrPlay: FC<Props> = ({ hasCards, onPress }) => (
  <>
    {hasCards ? (
      <View style={styles.container}>
        <PrimaryButton
          onPress={onPress}
          buttonText="Play"
          buttonStyle={styles.button}
          buttonTextStyle={styles.buttonText}
        />
      </View>
    ) : (
      <NoContentInfo text="card" style={styles.noContentInfo} iconName="prettyLady" />
    )}
  </>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    width: 80,
    backgroundColor: theme.colors.icon,
  },
  buttonText: {
    color: theme.colors.border,
  },
  noContentInfo: {
    marginTop: WINDOW_HEIGHT / 6,
  },
});

export { NoContentOrPlay };
