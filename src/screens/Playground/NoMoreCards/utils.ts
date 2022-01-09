export const getRandom = (items: { quote: string; author: string }[]) =>
  items[Math.floor(Math.random() * items.length)];
