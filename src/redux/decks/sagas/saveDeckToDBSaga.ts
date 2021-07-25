import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api from '../../../api';
import { DecksActionTypes, SaveDeckToDB } from '../interface';
import { RootState } from '../../store';
import { saveDeckToDBFailure, updateDeck } from '../actions';
import { CreateDeckResponse } from '../../../../../flashcards-api/src/db/types';

function* saveDeckToDB({ deckId }: SaveDeckToDB) {
  const { decks } = yield select((state: RootState) => state.decks);
  const selectedDeck = deckId ? decks[deckId] : null;
  try {
    const response: CreateDeckResponse = yield call(Api.saveDeck, selectedDeck);
    if (!response.data) {
      throw new Error('no data found');
    }

    if (response.data.shareId) {
      yield put(updateDeck(deckId, response.data));
    } else {
      yield put(saveDeckToDBFailure('error'));
    }
  } catch (error) {
    yield put(saveDeckToDBFailure(error.message));
  }
}

export default function* saveDeckToDBSaga() {
  yield takeLatest(DecksActionTypes.saveDeckToDB, saveDeckToDB);
}
