import { call, put, takeLatest } from 'redux-saga/effects';
import Api from '../../../api';
import { UserActionsTypes } from '../interface';
import { saveUserDBError } from '../actions';

function* saveUser() {
  try {
    const response = yield call(Api.saveUser);
    if (response.sub) {
      // TODO: not sure if any action is needed here because we already dispatch from auth0
    }
  } catch (error) {
    yield put(saveUserDBError());
  }
}

export default function* saveUserSaga() {
  yield takeLatest(UserActionsTypes.SAVE_USER_TO_DB, saveUser);
}
