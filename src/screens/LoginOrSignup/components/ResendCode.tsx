import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../../../common';

const ResendCode = ({ handleResendSms }: { handleResendSms: () => void }) => (
  <View style={styles.container}>
    <AppText size="h2" centered>
      Didn&apos;t get the code?{' '}
    </AppText>
    <TouchableOpacity onPress={handleResendSms}>
      <AppText size="h2" centered underlined>
        Resend code
      </AppText>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export { ResendCode };
