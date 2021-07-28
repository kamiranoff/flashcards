import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api, { SaveOrUpdateCardResponse } from '../../../api';
import { DecksActionTypes, SaveNewCard } from '../interface';
import { RootState } from '../../store';
import { saveOrUpdateCardToDBFailure, updateCardById } from '../actions';
import { Card } from '../reducer';

function* saveOrUpdateCard({ deckId, frontendId, isEdit }: SaveNewCard) {
  const { decks } = yield select((state: RootState) => state.decks);
  const selectedDeck = deckId ? decks[deckId] : null;
  const card = selectedDeck.cards.find((c: Card) => c.frontendId === frontendId);
  const data = {
    ...card,
    deckId: selectedDeck.deckId,
    isEdit,
  };
  try {
    const response: SaveOrUpdateCardResponse = yield call(Api.saveOrUpdateCard, data);
    if ('id' in response) {
      yield put(updateCardById(deckId, response));
    }
  } catch (error) {
    yield put(saveOrUpdateCardToDBFailure('saveOrUpdateCardToDBFailure'));
  }
}

export default function* saveOrUpdateCardSaga() {
  yield takeLatest(DecksActionTypes.saveNewCard, saveOrUpdateCard);
}
