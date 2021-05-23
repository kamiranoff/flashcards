import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Auth0UserInfo } from '../../../modules/Auth';

type Props = {
  user: Auth0UserInfo | null;
};

const Profile: FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <View style={styles.container}>
        <Image source={{ uri: user.picture }} style={styles.image} />
      </View>
      <Text style={styles.text}>Welcome: {user.name}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  text: { textAlign: 'center' },
});

export { Profile };
