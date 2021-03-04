import { all, fork } from 'redux-saga/effects';
import watchGetDeckByShareId from './decks/sagas/getDeckByShareIdSaga';

export default function* rootSaga() {
  yield all([fork(watchGetDeckByShareId)]);
}
