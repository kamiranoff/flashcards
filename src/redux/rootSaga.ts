import { all, fork } from 'redux-saga/effects';
import watchGetDeckByShareId from './decks/sagas/getDeckByShareIdSaga';
import editDeckBySharedIdSaga from './decks/sagas/editDeckBySharedIdSaga';

export default function* rootSaga() {
  yield all([fork(watchGetDeckByShareId), fork(editDeckBySharedIdSaga)]);
}
