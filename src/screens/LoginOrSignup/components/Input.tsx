import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';
import { sendSMS, verifyCode } from '../../../modules/Auth/services/Auth0';
import { Auth0Credentials } from '../../../modules/Auth';
import { AppText } from '../../../common';
import { theme } from '../../../utils';
import { ResendCode } from './ResendCode';
import { CELL_COUNT, CodeFieldInput } from './CodeFieldInput';

type Props = {
  onSuccess: (credentials: Auth0Credentials) => void;
  onSmsSuccess: (success: boolean) => void;
  onError: (credentials: Error) => void;
  success: boolean;
};

const Input: FC<Props> = ({ onSuccess, onError, onSmsSuccess, success }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [number, onChangeNumber] = useState<undefined | string>(undefined);
  const animate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setErrorMessage(false);
  }, [number]);

  useEffect(() => {
    if (verificationCode.length === CELL_COUNT) {
      setIsLoading(true);
      handleVerifyCode();
    } else {
      setIsLoading(false);
    }
  }, [verificationCode]);

  const handlePress = () => {
    Animated.timing(animate, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSend = async () => {
    try {
      if (number) {
        await sendSMS(
          number,
          () => onSmsSuccess(true),
          () => setErrorMessage(true),
        );
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const handleVerifyCode = async () => {
    try {
      if (number) {
        await verifyCode(number, verificationCode, onSuccess, onError);
      }
    } catch (e) {
      setErrorMessage(true);
    }
    setIsLoading(false);
    setVerificationCode('');
  };

  const handleResendSms = async () => {
    setIsLoading(false);
    setVerificationCode('');
    await handleSend();
  };

  const inputTextScaleInterpolate = animate.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const inputScaleInterpolate = animate.interpolate({
    inputRange: [0, 0.5, 0.6],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const inputTextStyle = {
    transform: [
      {
        scale: inputTextScaleInterpolate,
      },
    ],
  };

  const inputWrapStyle = {
    transform: [
      {
        scale: inputScaleInterpolate,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <Animated.View style={[styles.buttonWrap, success ? { borderWidth: 0 } : {}]}>
          {success && (
            <View style={styles.subText}>
              <AppText size="body">We sent it to {number}</AppText>
            </View>
          )}
          {!success && (
            <Animated.View style={[StyleSheet.absoluteFill, styles.inputWrap, inputWrapStyle]}>
              <TextInput
                keyboardType="numeric"
                onChangeText={onChangeNumber}
                value={number}
                placeholder="+447977777777"
                placeholderTextColor={theme.colors.green}
                style={styles.textInput}
              />
              <TouchableOpacity style={[styles.sendButton]} onPress={handleSend}>
                <Text style={styles.sendText}>Send</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          {!success && (
            <Animated.View style={inputTextStyle}>
              <Text style={styles.inputText}>Your phone number</Text>
            </Animated.View>
          )}
          {success && (
            <CodeFieldInput verificationCode={verificationCode} setVerificationCode={setVerificationCode} />
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
      {errorMessage ? (
        <View style={{ marginTop: 10 }}>
          <AppText size="body">Please try again</AppText>
        </View>
      ) : null}
      <ActivityIndicator animating={isLoading} size="large" />
      {success ? <ResendCode handleResendSms={handleResendSms} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  subText: {
    marginTop: -30,
    marginBottom: 30
  },
  buttonWrap: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    width: 300,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  inputText: {
    color: 'black',
    fontWeight: 'bold',
  },
  inputWrap: {
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textInput: {
    flex: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: 'black',
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: '#FFF',
  },
});

export { Input };
