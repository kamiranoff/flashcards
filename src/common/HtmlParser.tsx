import React, { FC, ReactNode } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import HTMLView, { HTMLViewNode } from 'react-native-htmlview';
import { isSmallDevice, SPACING, WINDOW_WIDTH } from '../utils/device';
import { theme } from "../utils";

interface Props {
  text: string | undefined;
  isSliced?: boolean;
}

interface HTMLViewNodeWithMissingProps extends HTMLViewNode {
  children?: HTMLViewNode;
}

const Img = ({ isSliced, attribs }: { isSliced?: boolean, attribs: HTMLViewNode['attribs'] }) => {
  const photoSlicedHeight = isSmallDevice() ? 50 : 60;
  const imgStyle = {
    width: isSliced ? WINDOW_WIDTH / 2 - SPACING * 5 : WINDOW_WIDTH - SPACING * 5,
    height: isSliced ? photoSlicedHeight : undefined,
    aspectRatio: 1,
  };

  const source = {
    uri: attribs.src,
    width: imgStyle.width,
    height: imgStyle.height,
  };

  return <Image source={source} style={imgStyle} resizeMode="cover" />;
};

const HtmlParser: FC<Props> = ({ text, isSliced = false }) => {
  const slicedText = text ? `${text.slice(0, 150)}` : '';

  const renderNode = (node: HTMLViewNodeWithMissingProps, index: number, siblings: HTMLViewNode, parent: HTMLViewNode, defaultRenderer: (node: HTMLViewNode, parent: HTMLViewNode) => ReactNode) => {
    switch (node.name) {
      case 'img': {
        return <Img key={index} attribs={node.attribs} isSliced={isSliced} />;
      }
      case 'blockquote': {
        if (!node.children) {
          return undefined;
        }
        return <View style={htmlStyles.blockquote}>{defaultRenderer(node.children, parent)}</View>;
      }
      default:
        return undefined;
    }
  };

  return text ? (
    <HTMLView
      renderNode={renderNode}
      value={isSliced ? slicedText : text}
      stylesheet={htmlStyles}
      addLineBreaks={false}
      textComponentProps={{ style: defaultStyle.text }}
    />
  ) : null;
};

const defaultStyle = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: theme.colors.linkColor, // links color
  },
  text: {
    fontSize: 18,
    lineHeight: 18 * 1.2,
  },
  paragraph: {
    fontSize: 16,
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
    marginVertical: 10,
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
  blockquote: {
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.quoteBorder,
  }
});

export default HtmlParser;
