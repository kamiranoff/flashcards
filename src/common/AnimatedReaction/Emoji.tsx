import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import nodeEmoji, { emoji } from 'node-emoji';

interface Props extends TextProps {
  name: keyof typeof emoji;
}

const Emoji: FC<Props> = ({ name, ...props }) => (
  <Text {...props}>{nodeEmoji.get(name)}</Text>
);

export { Emoji };
