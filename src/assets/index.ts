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
    menu: number;
    trash: number;
    menuCurve: number;
    plusCurve: number;
    x: number;
    strokeWhite: number;
    strokeWhite2: number;
    strokeBlack: number;
    magicWanda: number;
    chat: number;
    sale: number;
    heartCupid: number;
    gift: number;
    free: number;
    student: number;
    star: number;
    confusedFace: number;
    notSureFace: number;
    happyFace: number;
    faces: number;
    review: number;
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
    menu: require('./images/menu.png'),
    trash: require('./images/trash.png'),
    menuCurve: require('./images/menuCurve.png'),
    plusCurve: require('./images/plusCurve.png'),
    x: require('./images/x.png'),
    strokeWhite: require('./images/stroke.png'),
    strokeWhite2: require('./images/stroke2.png'),
    strokeBlack: require('./images/strokeBlack3.png'),
    magicWanda: require('./images/magicWand.png'),
    chat: require('./images/chat.png'),
    sale: require('./images/sale.png'),
    heartCupid: require('./images/heart.png'),
    gift: require('./images/gift.png'),
    free: require('./images/free.png'),
    student: require('./images/student.png'),
    star: require('./images/star.png'),
    confusedFace: require('./images/confused.png'),
    notSureFace: require('./images/scared.png'),
    happyFace: require('./images/smiley.png'),
    faces: require('./images/faces.png'),
    review: require('./images/review.png'),
  },
};

export default assets;
