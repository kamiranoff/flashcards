interface BaseTable {
  id: number;
}

export interface CardsTable extends BaseTable {
  question: string | null;
  answer: string | null;
  rank: number | null;
  frontend_id: number;
  is_public: boolean;
}

export interface DecksTable extends BaseTable {
  title: string | null;
  owner: string | null;
  share_id: string | null;
  is_public: boolean;
}

export interface DecksCardsTable {
  deck_id: number;
  card_id: number;
}

export interface CreateResponse {
  data?: {
    owner: DecksTable['owner'];
    cards: {
      id: CardsTable['id'];
      question: CardsTable['question'];
      answer: CardsTable['question'];
      frontendId: CardsTable['frontend_id'];
      isPublic: CardsTable['is_public'];
      rank: CardsTable['rank'];
    }[];
    deckId: number;
    isPublic: boolean;
    shareId: string | null;
    title: DecksTable['title'];
  };
  error?: string;
}

export interface GetDeckBySharedIdResponse extends CreateResponse {}
