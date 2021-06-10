import { put, takeLatest, call, select } from 'redux-saga/effects';
import Api from '../../../api';
import { getDeckByShareIdRequest, saveSharedDeckFailure, updateDeck } from '../actions';
import { DecksActionTypes, GetDeckByShareId } from '../interface';
import { RootState } from '../../store';

function* getDeckByShareIdSaga({ code, deckId }: GetDeckByShareId) {
  const { decks } = yield select((state: RootState) => state.decks);
  const selectedDeck = deckId ? decks[deckId] : null;
  try {
    yield put(getDeckByShareIdRequest());
    const response = yield call(Api.getSharedDeckBySharedId, code);
    const id = deckId || response.data.deckId;
    if (response.data.shareId) {
      const deck = {
        ...response.data,
        sharedByYou: selectedDeck ? selectedDeck.owner : false, // FIXME - add auth
        sharedWithYou: selectedDeck ? !selectedDeck.owner : true, // FIXME - add auth
      };
      yield put(updateDeck(id, deck));
    }
  } catch (error) {
    yield put(saveSharedDeckFailure(true));
  }
}

export default function* watchGetDeckByShareId() {
  yield takeLatest(DecksActionTypes.getDeckByShareId, getDeckByShareIdSaga);
}
