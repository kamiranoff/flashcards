import { delay, put, select, takeLatest } from 'redux-saga/effects';
import { clearUserError } from '../actions';
import { UserActionsTypes } from '../interface';

function* clearError() {
  const DELAY_SECONDS = 3000;
  const { error } = yield select((state) => state.user);
  if (error) {
    yield delay(DELAY_SECONDS);
    yield put(clearUserError());
  }
}

export default function* clearUserErrorSaga() {
  yield takeLatest([UserActionsTypes.SAVE_USER_AUTH0_ERROR, UserActionsTypes.SAVE_USER_DB_ERROR], clearError);
}
