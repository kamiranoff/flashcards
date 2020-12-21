export interface IAssets {
  icons: {
    goBack: number;
    add: number;
    remove: number;
    play: number;
    edit: number;
    plus: number;
  };
}

const assets: IAssets = {
  icons: {
    goBack: require('./images/backIcon.png'),
    add: require('./images/add.png'),
    remove: require('./images/remove.png'),
    play: require('./images/play2.png'),
    edit: require('./images/edit.png'),
    plus: require('./images/plusWhite.png'),
  },
};

export default assets;
