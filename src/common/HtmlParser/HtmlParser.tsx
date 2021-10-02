import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import HTMLView, { HTMLViewNode } from 'react-native-htmlview';
import { theme } from '../../utils';
import { Li } from './Li';
import { Img } from './Img';

interface Props {
  text: string | undefined;
  withImgContainer?: boolean;
}

interface HTMLViewNodeWithMissingProps extends HTMLViewNode {
  children?: HTMLViewNode;
  parent?: HTMLViewNode;
}

const HtmlParser: FC<Props> = ({ text, withImgContainer }) => {
  const renderNode = (
    node: HTMLViewNodeWithMissingProps,
    index: number,
    siblings: HTMLViewNode,
    parent: HTMLViewNode,
    defaultRenderer: (node: HTMLViewNode, parent: HTMLViewNode) => ReactNode,
  ) => {
    switch (node.name) {
      case 'img': {
        return <Img key={index} attribs={node.attribs} withImgContainer={withImgContainer} />;
      }
      case 'ul': {
        if (!node.children) {
          return undefined;
        }
        return <View key={`${index}-ul`}>{defaultRenderer(node.children, parent)}</View>;
      }
      case 'li': {
        if (!node.children) {
          return undefined;
        }

        return (
          <Li
            key={index}
            node={node}
            index={index}
            siblings={siblings}
            parent={parent}
            defaultRenderer={defaultRenderer}
          />
        );
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
      value={text}
      stylesheet={htmlStyles}
      addLineBreaks={false}
      textComponentProps={{ style: defaultStyle.text }}
    />
  ) : null;
};

const defaultStyle = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#000',
  },
});

const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: theme.colors.linkColor, // links color
  },
  text: {
    fontSize: 20,
    lineHeight: 20 * 1.2,
  },
  paragraph: {
    fontSize: 18,
    marginVertical: 10,
  },
  image: {
    marginVertical: 0,
  },
  list: {
    marginVertical: 8,
  },
  h1: {
    fontSize: 22,
    lineHeight: 22 * 1.4,
    marginVertical: 10,
    fontWeight: '500',
  },
  h2: {
    fontSize: 20,
    lineHeight: 20 * 1.4,
    marginTop: 10,
    fontWeight: '500',
  },
  h3: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    marginTop: 10,
    fontWeight: '500',
  },
  blockquote: {
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.quoteBorder,
    marginVertical: 10,
  },
});

export default HtmlParser;
