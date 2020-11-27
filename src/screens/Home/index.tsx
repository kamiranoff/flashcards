import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../common/Button';

const Home = () => {
  const navigation = useNavigation();
  const handleNavigateToCreate = () => navigation.navigate('Create');

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <View style={styles.buttonContainer}>
        <Button text="Plus" onPress={handleNavigateToCreate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default Home;
