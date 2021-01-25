import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

interface Props {
  text: string | undefined;
  isSliced?: boolean;
}

const HtmlParser: FC<Props> = ({ text, isSliced = false }) => {
  const slicedText = text ? (text.length < 10 ? `${text.slice(0, 22)}...` : `${text.slice(0, 50)}...`) : '';
  return text ? <HTMLView value={isSliced ? slicedText : text} stylesheet={htmlStyles} /> : null;
};

const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366', // links color
  },
  text: {
    color: 'red',
    fontSize: 18,
    lineHeight: 18 * 1.2,
  },
  paragraph: {
    marginVertical: 10,
  },
  image: {
    marginVertical: 0,
  },
  list: {
    marginVertical: 5,
  },
  h1: {
    fontSize: 20,
    lineHeight: 18 * 1.4,
    marginTop: 10,
    fontWeight: '500',
  },
  h2: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    marginTop: 10,
    fontWeight: '500',
  },
  h3: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
    marginTop: 10,
    fontWeight: '500',
  },
  listItem: {
    marginVertical: 2,
  },
  listItemContent: {},
});

export default HtmlParser;
