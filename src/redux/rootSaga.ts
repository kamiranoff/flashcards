import { all, fork } from 'redux-saga/effects';
import watchGetDeckByShareId from './decks/sagas/getDeckByShareIdSaga';
import clearErrorSaga from './decks/sagas/clearErrorSaga';
import saveDeckToDBSaga from './decks/sagas/saveDeckToDBSaga';
import saveOrUpdateCardSaga from './decks/sagas/saveOrUpdateCardSaga';
import saveUserSaga from './user/sagas/saveUserSaga';
import clearUserErrorSaga from './user/sagas/clearUserErrorSaga';

export default function* rootSaga() {
  yield all([
    fork(watchGetDeckByShareId),
    fork(clearErrorSaga),
    fork(saveDeckToDBSaga),
    fork(saveOrUpdateCardSaga),
    fork(saveUserSaga),
    fork(clearUserErrorSaga),
  ]);
}
