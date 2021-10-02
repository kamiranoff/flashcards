import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { HTMLViewNode } from 'react-native-htmlview';

interface HTMLViewNodeWithMissingProps extends HTMLViewNode {
  children?: HTMLViewNode;
  parent?: HTMLViewNode;
}

interface HtmlParserLiProps {
  node: HTMLViewNodeWithMissingProps;
  index: number;
  siblings: HTMLViewNode;
  parent: HTMLViewNode;
  defaultRenderer: (node: HTMLViewNode, parent: HTMLViewNode) => ReactNode;
}

const Li = ({ node, index, parent, defaultRenderer }: HtmlParserLiProps) => {
  if (!node.children) {
    return null;
  }

  const bullet = node.parent?.name === 'ol' ? `${index + 1}.` : '\u2022';
  return (
    <View key={`${index}-li`} style={index === 0 ? liStyles.containerFirst : liStyles.container}>
      <View style={liStyles.row}>
        <View style={liStyles.content}>
          <Text ellipsizeMode="tail" numberOfLines={1} style={liStyles.bullet}>
            {bullet}
          </Text>
        </View>
        <View style={liStyles.textContainer}>
          <Text ellipsizeMode="tail" numberOfLines={2}>
            {defaultRenderer(node.children, parent)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const liStyles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  containerFirst: {
    paddingTop: 0,
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'column',
    marginLeft: 5,
    width: 20,
  },
  bullet: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  textContainer: {
    flexDirection: 'column',
    width: '90%',
  },
});

export { Li };
