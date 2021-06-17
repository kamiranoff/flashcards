import { useEffect } from 'react';
import { saveDeckToDB } from '../redux/decks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useShareDeck = (isShareOpen: boolean, shareId: string, deckId: string, callback: () => void) => {
  const { sub } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShareOpen && sub) {
      if (!shareId) {
        dispatch(saveDeckToDB(deckId));
      }
      if (callback) callback();
    }
  }, [isShareOpen, sub]);
}

export { useShareDeck };
