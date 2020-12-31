import React, { FC } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { RootStackParamList, Screens } from '../navigation/interface';
import { StackNavigationProp } from '@react-navigation/stack';

type AlertScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ALERT>;

export interface Props {
  navigation: AlertScreenNavigationProp;
}

const AlertModal: FC<Props> = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity style={{ backgroundColor: 'white', padding: 20 }} onPress={() => navigation.pop()}>
      <Text>Modal me</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlertModal;
