import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from '../../../api';
import { DecksActionTypes, SaveDeckToDB } from '../interface';
import { RootState } from '../../store';
import { saveDeckToDBFailure, updateDeck } from '../actions';

function* saveDeckToDB({ deckId }: SaveDeckToDB) {
  const { decks } = yield select((state: RootState) => state.decks);
  const selectedDeck = deckId ? decks[deckId] : null;
  try {
    const response = yield call(Api.saveDeck, selectedDeck);
    if (response.data.shareId) {
      yield put(updateDeck(deckId, response.data));
    }
  } catch (error) {
    yield put(saveDeckToDBFailure(true));
  }
}

export default function* saveDeckToDBSaga() {
  yield takeLatest(DecksActionTypes.saveDeckToDB, saveDeckToDB);
}
