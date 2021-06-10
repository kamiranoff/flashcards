const method: { [key: string]: string } = {
  g: 'Google',
  f: 'Facebook',
  a: 'Apple',
  s: 'SMS',
};

const getLoginMethod = (str: string) => {
  const firstLetter = str.split('|')[0].charAt(0);
  return method[firstLetter];
};

export { getLoginMethod };
