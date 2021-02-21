import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, TextInput, Image } from 'react-native';
import { CloseButton, PrimaryButton } from '../../common';
import { useDispatch } from 'react-redux';
import { saveDeck } from '../../redux/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Screens } from '../../navigation/interface';
import assets from '../../assets';
import CustomText from '../../common/CustomText';
import { getPlatformDimension, isIOS } from '../../utils/device';
import { theme } from '../../utils';

type AddDeckScreenNavigationProp = StackNavigationProp<RootStackParamList, Screens.ADD_DECK>;

export interface Props {
  navigation: AddDeckScreenNavigationProp;
}

const AddDeck: FC<Props> = ({ navigation }) => {
  const [newTitle, setNewTitle] = useState('');
  const opacityVal = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.timing(opacityVal, {
      toValue: 1,
      delay: 500,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacityVal]);

  const handleSaveDeck = () => {
    const newId = String(Date.now());
    if (newTitle) {
      dispatch(saveDeck(newId, newTitle));
      setTimeout(() => navigation.goBack(), 200);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.offset}>
        <CloseButton onPress={() => navigation.goBack()} />
      </View>
      <Animated.View style={[{ opacity: isIOS ? opacityVal : 1 }, styles.content]}>
        <CustomText size="hero">Your new deck name</CustomText>
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder=""
          placeholderTextColor="white"
          selectionColor="white"
        />
        <Image source={assets.icons.strokeWhite2} resizeMode="contain" style={styles.stroke} />
        <View style={styles.buttonContainer}>
          <PrimaryButton
            disabled={!newTitle}
            buttonText="Save"
            onPress={handleSaveDeck}
            hasShadow={isIOS}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={{ color: theme.colors.border }}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignContent: 'center',
  },
  content: {
    paddingHorizontal: 10,
    marginTop: getPlatformDimension(120, 120, 140, 160),
  },
  stroke: {
    width: '100%',
    height: 5,
    resizeMode: 'contain',
  },
  input: {
    marginTop: 40,
    height: 40,
    fontSize: 18,
    borderRadius: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    width: 120,
    alignSelf: 'center',
  },
  offset: {
    marginLeft: 6,
  },
  buttonStyle: {
    backgroundColor: theme.colors.icon,
  },
});

export default AddDeck;
