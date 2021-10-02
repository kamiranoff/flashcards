import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CloseButton } from '../../../common';
import IconButton from '../../../common/IconButton';
import { Screens } from '../../../navigation/types';
import { getStatusBarHeight } from '../../../utils/device';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type Props = {
  title: string;
  deckId: string;
  isShared: boolean;
};

const Header: FC<Props> = ({ title, deckId, isShared }) => {
  const { navigate, goBack } = useNavigation();
  const { sub } = useSelector((state: RootState) => state.user);
  const handleOnPlusPress = () => {
    if (isShared && !sub) {
      navigate(Screens.LOGIN_OR_SIGNUP);
      return;
    }
    navigate(Screens.QUESTION_MODAL, { title, deckId });
  };
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
    top: getStatusBarHeight(),
    zIndex: 9,
  },
});

export { Header };
