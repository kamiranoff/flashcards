export interface IAssets {
  icons: {
    goBack: number;
    add: number;
    remove: number;
    play: number;
    edit: number;
    plus: number;
    close: number;
    keyboard: number;
    h1: number;
    h2: number;
    redo: number;
    undo: number;
    strikethrough: number;
    underline: number;
    good: number;
    wrong: number;
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
    close: require('./images/close.png'),
    keyboard: require('./images/keyboard.png'),
    h1: require('./images/h1copy.png'),
    h2: require('./images/h2copy.png'),
    redo: require('./images/redo.png'),
    undo: require('./images/undo.png'),
    underline: require('./images/underline.png'),
    strikethrough: require('./images/strikethrough.png'),
    good: require('./images/good.png'),
    wrong: require('./images/wrong.png'),
  },
};

export default assets;
