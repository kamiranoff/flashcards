import { delay, put, select, takeLatest } from 'redux-saga/effects';
import { clearDecksError } from '../actions';
import { DecksActionTypes } from '../interface';

function* clearError() {
  const DELAY_SECONDS = 3000;
  const { error } = yield select((state) => state.decks);
  if (error) {
    yield delay(DELAY_SECONDS);
    yield put(clearDecksError());
  }
}

export default function* clearErrorSaga() {
  yield takeLatest([DecksActionTypes.getDeckByShareIdError], clearError);
}
