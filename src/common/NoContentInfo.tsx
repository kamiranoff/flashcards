import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import assets from '../assets';

interface Props {
  text: string;
  iconName?: 'oldMan1' | 'prettyLady';
}
const NoContentInfo: FC<Props> = ({ text, iconName = 'oldMan1' }) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Image source={assets.icons[iconName]} style={styles.img} resizeMode="contain" />
      <View>
        <CustomText size="h1" centered>
          Press plus to
        </CustomText>
        <CustomText size="h2" centered>
          create your first {text}!
        </CustomText>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -50,
  },
  img: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoContentInfo;
