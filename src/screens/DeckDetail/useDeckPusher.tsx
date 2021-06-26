import { useEffect } from 'react';
import { pusher } from '../../service/pusher';

interface CreateCardResponse {
  id: number;
  question: string | null;
  answer: string | null;
  rank: number | null;
  frontendId: number;
}

interface UpdateCardResponse {
  id: number;
  question: string | null;
  answer: string | null;
  frontendId: number;
  rank: number | null;
}

const useDeckPusher = (deckId: string | null, shareId: string | null, callback: () => void) => {
  useEffect(() => {
    if (pusher && deckId && shareId) {
      const channel = pusher.subscribe(`deck-${deckId}`);
      channel.bind('card-created', (_: CreateCardResponse) => {
        callback();
      });
      channel.bind('card-updated', (_: UpdateCardResponse) => {
        callback();
      });
    }
  }, [shareId]);
};

export { useDeckPusher };
