import { put, takeLatest, call } from 'redux-saga/effects';
import Api from '../../../api';
import { saveSharedDeck } from '../actions';
import { DecksActionTypes, GetDeckByShareId } from '../interface';

function* getDeckByShareIdSaga({ code }: GetDeckByShareId) {
  try {
    const response = yield call(Api.getSharedDeckBySharedId, code);
    const id = response.data.id;
    const deck = {
      owner: response.data.owner,
      title: response.data.title,
      cards: response.data.cards,
      shareId: response.data.share_id,
      sharedByYou: false,
      sharedWithYou: true,
      isOwner: false,
    };
    yield put(saveSharedDeck(deck, id));
  } catch (error) {
    // yield put(saveSharedDeckFailure({ message: 'Sorry something is broken' }));
    // FIXME:
    // add logger
    // add general notifications
  }
}

export default function* watchGetDeckByShareId() {
  yield takeLatest(DecksActionTypes.getDeckByShareId, getDeckByShareIdSaga);
}
