import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../../common';

type Props = {
  primaryText: string;
  secondaryText: string;
};

const Title: FC<Props> = ({ primaryText, secondaryText }) => (
  <View style={styles.container}>
    <AppText size="hero" centered textStyle={styles.color}>
      {primaryText}
    </AppText>
    {secondaryText ? (
      <AppText size="h2" centered>
        {secondaryText}
      </AppText>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  color: {
    color: '#000',
  },
});

export { Title };
