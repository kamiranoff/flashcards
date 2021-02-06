import React, { FC } from 'react';
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';

export interface IDismissKeyboard extends TouchableWithoutFeedbackProps {
  children: JSX.Element | JSX.Element[];
  rest?: TouchableWithoutFeedbackProps;
}

const DismissKeyboard: FC<IDismissKeyboard> = ({ children, ...rest }) => (
  <TouchableWithoutFeedback {...rest}>{children}</TouchableWithoutFeedback>
);

export default DismissKeyboard;
