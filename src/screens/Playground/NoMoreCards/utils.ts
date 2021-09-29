import animations from '../../../assets/animations';
import { quotes } from './quotes';

type Info = {
  primary: string;
  secondary: string;
  icon: keyof typeof animations;
  score: string;
};

const getRandom = (items: { quote: string; author: string }[]) =>
  items[Math.floor(Math.random() * items.length)];

export const getLadyScoreInfo = (correct: number, incorrect: number): Info => {
  const total = correct + incorrect;
  const score = Math.round(total ? (correct / total) * 100 : 0);
  const info = {
    primary: '',
    secondary: '',
    icon: animations.mehLady,
    score: `${score}%`,
  };
  const quote = getRandom(quotes);
  if (score < 50) {
    info.secondary = quote.author;
    info.primary = quote.quote;
    info.icon = animations.sadLady;
  } else if (score < 69) {
    info.secondary = quote.author;
    info.primary = quote.quote;
    info.icon = animations.mehLady;
  } else if (score <= 85) {
    info.secondary = quote.author;
    info.primary = quote.quote;
    info.icon = animations.mehLady;
  } else if (score > 85) {
    info.secondary = quote.author;
    info.primary = quote.quote;
    info.icon = animations.happyLady;
  }
  return info;
};
