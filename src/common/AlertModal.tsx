import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const AlertModal = ({ navigation }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <TouchableOpacity
      style={{ backgroundColor: 'white', padding: 20 }}
      onPress={() => navigation.pop()}
    >
      <Text>Modal me</Text>
    </TouchableOpacity>
  </View>
);

export default AlertModal;

