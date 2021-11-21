import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, Container, PrimaryButton } from '../../common';
import { usePermissionsContext } from '../../context/PermissionsProvider';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Permissions = () => {
  const { goBack } = useNavigation();
  const { handleRequestPhotoLibraryPermission, isPhotoLibraryGranted } = usePermissionsContext();
  useEffect(() => {
    if (isPhotoLibraryGranted) {
      return goBack();
    }
  }, [isPhotoLibraryGranted, goBack]);

  if (isPhotoLibraryGranted) {
    return null;
  }
  return (
    <Container style={styles.container}>
      <AppText size="hero" centered textStyle={{ color: 'black' , marginBottom: 20 }}>
        Want to add an image?
      </AppText>
      <AppText size="h2" centered>
        Continue to allow MyFlashcards to access your photo library.
      </AppText>
      <View style={styles.buttonContainer}>
        <PrimaryButton buttonText="Continue" onPress={handleRequestPhotoLibraryPermission} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: 120,
    alignSelf: 'center',
  },
});

export { Permissions };
