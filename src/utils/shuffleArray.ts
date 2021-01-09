// Credit goes to https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
interface Datum {
  [k: string]: boolean | number | string | object;
}

type Data = Datum[];

const shuffleArray = function (array: Data) {
  const a = array.slice(0);

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
};

export default shuffleArray;
