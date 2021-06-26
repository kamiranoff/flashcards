import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { randomEnum } from './utils';
import { Emoji } from './Emoji';

export enum Shapes {
  HEART = 'heart',
  TWO_HEARTS = 'two_hearts',
  YELLOW_HEART = 'yellow_heart',
  BLUE_HEART = 'blue_heart',
  GREEN_HEART = 'green_heart',
  PURPLE_HEART = 'purple_heart',
  SPARKLING_HEART = 'sparkling_heart',
}

export enum ShapesExtra {
  RANDOM = 'random',
  MIXED = 'mixed',
}

export type ShapeType = Shapes | ShapesExtra;

type Props = {
  type: ShapeType;
};

const isShapeValue = (value: string | Shapes): value is Shapes => {
  return Object.values(Shapes).some((x) => x === value);
};

const Shape: FC<Props> = ({ type }) => {
  switch (type) {
    case Shapes.YELLOW_HEART:
    case Shapes.HEART:
    case Shapes.TWO_HEARTS:
    case Shapes.BLUE_HEART:
    case Shapes.GREEN_HEART:
    case Shapes.PURPLE_HEART:
    case Shapes.SPARKLING_HEART:
      return <Emoji name={type} style={styles.text} />;
    case ShapesExtra.RANDOM:
      if (isShapeValue(type)) {
        return <Emoji name={type} style={styles.text} />;
      }
      return <Emoji name={Shapes.TWO_HEARTS} style={styles.text} />;
    case ShapesExtra.MIXED: {
      const randomEmoji = randomEnum(Shapes);
      return <Emoji name={randomEmoji} style={styles.text} />;
    }
    default:
      return <Emoji name="heart" style={styles.text} />;
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
  },
});

export { Shape };
