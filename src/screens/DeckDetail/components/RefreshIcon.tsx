import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton, { IconButtonProps } from '../../../common/IconButton';
import { isLargeDevice } from '../../../utils/device';

type Props = {
  isVisible: boolean;
  onPress: IconButtonProps['onPress'];
};

const RefreshIcon: FC<Props> = ({ isVisible, onPress }) => {
  if (!isVisible) return null;
  return (
    <View style={styles.container}>
      <IconButton onPress={onPress} iconName="refresh" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: isLargeDevice() ? 40 : 20,
    left: 16,
  },
});
export { RefreshIcon };
