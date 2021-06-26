import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api from '../../../api';
import { GetDeckBySharedIdResponse } from '../../../api/types';
import { getDeckByShareIdRequest, saveSharedDeckFailure, updateDeck } from '../actions';
import { DecksActionTypes, GetDeckByShareId } from '../interface';
import { RootState } from '../../store';

function* getDeckByShareIdSaga({ code, deckId }: GetDeckByShareId) {
  const { decks, user } = yield select((state: RootState) => state);
  const selectedDeck = deckId ? decks[deckId] : null;
  try {
    yield put(getDeckByShareIdRequest());
    const response: GetDeckBySharedIdResponse = yield call(Api.getSharedDeckBySharedId, code);
    if (!response.data) {
      throw new Error(response.error || 'Unknown error');
    }

    const id = deckId || response.data.deckId;
    if (response.data.shareId) {
      const deck = {
        ...response.data,
        isOwner: user.sub === response.data.owner,
        sharedByYou: selectedDeck ? selectedDeck.owner : user.sub === response.data.owner,
        sharedWithYou: selectedDeck ? !selectedDeck.owner : user.sub !== response.data.owner,
      };
      yield put(updateDeck(id.toString(), deck));
    }
  } catch (error) {
    yield put(saveSharedDeckFailure('true')); // TODO: create getDeckByShareIdError
  }
}

export default function* watchGetDeckByShareId() {
  yield takeLatest(DecksActionTypes.getDeckByShareId, getDeckByShareIdSaga);
}
