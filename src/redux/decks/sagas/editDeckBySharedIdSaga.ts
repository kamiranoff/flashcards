import { takeLatest, call, select } from 'redux-saga/effects';
import Api from '../../../api';
import { DecksActionTypes, EditAndSaveSharedDeck } from '../interface';
import { RootState } from '../../store';

function* editDeck({ deckId, shareId }: EditAndSaveSharedDeck) {
  const { decks } = yield select((state: RootState) => state.decks);
  const selectedDeck = deckId ? decks[deckId] : null;
  try {
    yield call(Api.editDeckByShareId, selectedDeck, shareId);
  } catch (error) {
    // FIXME:
    // add logger
    // add general notifications
  }
}

export default function* editDeckBySharedIdSaga() {
  yield takeLatest(DecksActionTypes.editAndSaveSharedDeck, editDeck);
}
