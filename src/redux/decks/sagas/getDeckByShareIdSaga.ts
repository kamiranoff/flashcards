import { call, put, select, takeLatest } from 'redux-saga/effects';
import Api from '../../../api';
import { GetDeckBySharedIdResponse } from '../../../api/types';
import { getDeckByShareIdError, updateDeck } from '../actions';
import { DecksActionTypes, GetDeckByShareId } from '../interface';
import { RootState } from '../../store';
import { Card } from '../reducer';

function* getDeckByShareIdSaga({ code, deckId }: GetDeckByShareId) {
  const { decks, user } = yield select((state: RootState) => state);
  const selectedDeck = deckId ? decks.decks[deckId] : null;
  try {
    const response: GetDeckBySharedIdResponse = yield call(Api.getSharedDeckBySharedId, code);
    if (!response.data) {
      throw new Error(response.error || 'Unknown error');
    }

    const id = deckId || response.data.deckId;
    if (response.data.shareId) {
      const cards = response.data.cards.map((c) => {
        const selectedCard = selectedDeck.cards.find((card: Card) => card.id === c.id);
        return {
          ...c,
          rank: selectedCard.rank,
        };
      });
      const deck = {
        ...response.data,
        isOwner: user.sub === response.data.owner,
        sharedByYou: selectedDeck ? selectedDeck.owner : user.sub === response.data.owner,
        sharedWithYou: selectedDeck ? !selectedDeck.owner : user.sub !== response.data.owner,
        cards,
      };

      yield put(updateDeck(id.toString(), deck));
    }
  } catch (error) {
    yield put(getDeckByShareIdError('Something went wrong'));
  }
}

export default function* watchGetDeckByShareId() {
  yield takeLatest(DecksActionTypes.getDeckByShareId, getDeckByShareIdSaga);
}
