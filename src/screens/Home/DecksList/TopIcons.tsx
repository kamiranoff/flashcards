import React, { FC } from 'react';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import IconButton from '../../../common/IconButton';

type Props = {
  onDelete: (e: GestureResponderEvent) => void;
  onEdit: () => void;
};

const TopIcons: FC<Props> = ({ onDelete, onEdit }) => {
  return (
    <View style={styles.container}>
      <IconButton
        onPress={onDelete}
        iconName="trash"
        imgStyle={styles.transparentIconImg}
        style={styles.trashIcon}
        hasShadow={false}
      />
      <IconButton
        onPress={onEdit}
        iconName="edit"
        imgStyle={styles.transparentIconImg}
        style={styles.transparentIcon}
        hasShadow={false}
      />
    </View>
  );
};

const transparentIcon = {
  backgroundColor: 'transparent',
  borderWidth: 0.5,
  borderColor: '#222',
  width: 30,
  height: 30,
  shadowColor: 'transparent',
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    top: 5,
    right: 10,
    alignSelf: 'flex-end',
    zIndex: 9,
  },
  transparentIcon: {
    ...transparentIcon,
  },
  trashIcon: {
    ...transparentIcon,
    marginRight: 10,
  },
  transparentIconImg: {
    width: 18,
    height: 18,
  },
});

export { TopIcons };
