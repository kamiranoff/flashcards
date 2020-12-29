import { Alert } from 'react-native';

const NativeAlert = (title: string, onPress: () => void) => {
  Alert.alert(
    title,
    '',
    [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'Yes', onPress: onPress },
    ],
    { cancelable: false },
  );
};

export default NativeAlert;
