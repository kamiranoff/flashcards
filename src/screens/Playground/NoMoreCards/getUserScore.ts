import { quotes } from './quotes';

const getRandom = (items: { quote: string; author: string }[]) =>
  items[Math.floor(Math.random() * items.length)];

const getUserScore = (correct: number, incorrect: number) => {
  const total = correct + incorrect;
  const score = Math.round((correct / total) * 100);
  const info = {
    primary: '',
    secondary: '',
    icon: '',
    score: `${score}%`,
  };
  const quote = getRandom(quotes);
  if (score < 50) {
    info.secondary = quote.author;
    info.primary = quote.quote;
    info.icon = 'sad';
  } else if (score < 69) {
    info.secondary = quote.author;
    info.primary = quote.quote;
    info.icon = 'meh';
  } else if (score <= 85) {
    info.secondary = quote.author;
    info.primary = quote.quote;
    info.icon = 'meh';
  } else if (score > 85) {
    info.secondary = quote.author;
    info.primary = quote.quote;
    info.icon = 'happy';
  }
  return info;
};

export default getUserScore;
