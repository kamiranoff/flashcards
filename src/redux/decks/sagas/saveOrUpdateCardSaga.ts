import { takeLatest, call, select, put } from 'redux-saga/effects';
import Api from '../../../api';
import { DecksActionTypes, SaveNewCard } from '../interface';
import { RootState } from '../../store';
import { saveOrUpdateCardToDBFailure, updateCardById } from '../actions';
import { Card } from '../reducer';

function* saveOrUpdateCard({ deckId, frontEndId, isEdit }: SaveNewCard) {
  const { decks } = yield select((state: RootState) => state.decks);
  const selectedDeck = deckId ? decks[deckId] : null;
  const card = selectedDeck.cards.find((c: Card) => c.frontEndId === frontEndId);
  const data = {
    ...card,
    deckId: selectedDeck.deckId,
    isEdit,
  };
  try {
    const response = yield call(Api.saveOrUpdateCard, data);
    if (response.data.id) {
      yield put(updateCardById(deckId, response.data));
    }
  } catch (error) {
    yield put(saveOrUpdateCardToDBFailure('true'));
  }
}

export default function* saveOrUpdateCardSaga() {
  yield takeLatest(DecksActionTypes.saveNewCard, saveOrUpdateCard);
}
