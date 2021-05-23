import { call, takeLatest } from 'redux-saga/effects';
import Api from '../../../api';
import { UserActionsTypes } from '../interface';

function* saveUser() {
  try {
    const response = yield call(Api.saveUser);
    if (response.data) {
      // TODO: not sure if any action is needed here because we already have that in Auth0
    }
  } catch (error) {
    // yield put(saveUserFailure(true));
  }
}

export default function* saveUserSaga() {
  yield takeLatest(UserActionsTypes.SAVE_USER_TO_DB, saveUser);
}
