import axios from 'axios';
import Config from 'react-native-config';
import { captureException } from '@sentry/react-native';
import { Card } from '../redux/decks/reducer';
import { Logger } from '../service/Logger';
import { CreateResponse, GetDeckBySharedIdResponse } from './types';
import { CreateDeckResponse } from '../../../flashcards-api/src/db/types';

interface File {
  uri: string;
  name: string;
  type: string;
}

export interface ResponseDeck {
  id: string;
  title: string;
  owner: string;
  share_id: string;
  cards: Card[];
}

async function savePhoto(
  file: File,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
): Promise<string[]> {
  const formData = new FormData();
  formData.append('photo', file as any);
  const response = await axios.post(`${Config.API_URL}/image`, formData, {
    timeout: 15000,
    onUploadProgress,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.photo;
}

export interface ContactResponse {
  data?: boolean;
  error?: string;
}

async function contact(data: {}): Promise<ContactResponse> {
  try {
    const response = await axios.post(`${Config.API_URL}/contact`, data);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'contact');
    captureException(error);
    throw error;
  }
}

async function saveDeck(data: {}): Promise<CreateResponse> {
  try {
    const response: CreateDeckResponse = await axios.post(`${Config.API_URL}/deck`, data);
    if (!response.data) {
      throw new Error('no data found');
    }
    return response;
  } catch (error) {
    Logger.sendLocalError(error, error.message);
    captureException(error);
    throw error;
  }
}

async function getSharedDeckBySharedId(sharedId: string): Promise<GetDeckBySharedIdResponse> {
  try {
    const response = await axios.get(`${Config.API_URL}/deck/${sharedId}`);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'getSharedDeckBySharedId');
    captureException(error);
    throw error;
  }
}

export interface SaveOrUpdateCardResponse {
  data?: { fontEndId: number; cardId: number; question: string; answer: string; rank: null };
  error?: string;
}

async function saveOrUpdateCard(data: {
  deckId: number;
  question: string;
  answer: string;
  fontEndId: number;
  id: number | null;
  isEdit: boolean;
}): Promise<SaveOrUpdateCardResponse> {
  try {
    let response;
    if (data.isEdit && data.id) {
      // update card
      response = await axios.put(`${Config.API_URL}/card/${data.id}`, data);
      return response.data;
    }
    // save new card
    response = await axios.post(`${Config.API_URL}/card`, data);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'saveOrUpdateCard');
    captureException(error);
    throw error;
  }
}

const Api = {
  savePhoto,
  contact,
  saveDeck,
  getSharedDeckBySharedId,
  saveOrUpdateCard,
};

export default Api;
