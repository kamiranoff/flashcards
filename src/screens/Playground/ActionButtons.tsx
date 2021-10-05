import React, { FC } from 'react';
import { StyleSheet, View, GestureResponderEvent, Platform } from 'react-native';
import { IconButton } from '../../common';
import { getPlatformDimension } from '../../utils/device';

interface Props {
  onPressLeft: (event: GestureResponderEvent) => void;
  onPressRight: (event: GestureResponderEvent) => void;
}

const ActionButtons: FC<Props> = ({ onPressRight, onPressLeft }) => (
  <View style={styles.container}>
    <View style={styles.buttonBar}>
      <IconButton
        onPress={onPressLeft}
        iconName="notSureFace"
        style={styles.badAnswer}
        imgStyle={styles.icon}
      />
      <IconButton
        onPress={onPressRight}
        iconName="happyFace"
        style={styles.iconContainer}
        imgStyle={styles.icon}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: getPlatformDimension(10, 20, 30),
    right: 0,
    left: 0,
  },
  buttonBar: {
    alignSelf: 'center',
    width: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  badAnswer: {
    width: 50,
    height: 50,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
    backgroundColor: '#ffad8b', // #f8bad0
  },
  iconContainer: {
    width: 50,
    height: 50,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
    backgroundColor: '#fbe29f',
  },
  icon: {
    width: 55,
    height: 55,
  },
});

export default ActionButtons;
