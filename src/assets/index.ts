export interface IAssets {
  icons: {
    goBack: number;
    add: number;
    remove: number;
  };
}

const assets: IAssets = {
  icons: {
    goBack: require('./images/backIcon.png'),
    add: require('./images/add.png'),
    remove: require('./images/remove.png'),
  },
};

export default assets;
