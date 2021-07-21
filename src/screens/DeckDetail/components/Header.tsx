import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CloseButton } from '../../../common';
import IconButton from '../../../common/IconButton';
import { Screens } from '../../../navigation/types';
import { getPlatformDimension } from '../../../utils/device';

type Props = {
  title: string;
  deckId: string;
};

const Header: FC<Props> = ({ title, deckId }) => {
  const { navigate, goBack } = useNavigation();
  const handleOnPlusPress = () => navigate(Screens.QUESTION_MODAL, { title, deckId });
  return (
    <>
      <CloseButton onPress={goBack} />
      <View style={styles.addIcon}>
        <IconButton onPress={handleOnPlusPress} iconName="plusCurve" />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  addIcon: {
    right: 10,
    position: 'absolute',
    top: getPlatformDimension(20, 20, 50),
    zIndex: 9,
  },
});

export { Header };
