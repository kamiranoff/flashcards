import axios from 'axios';
import Config from 'react-native-config';
import { captureException } from '@sentry/react-native';
import { Card } from '../redux/decks/reducer';
import { Logger } from '../service/Logger';

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

async function contact(data: {}): Promise<{ data: boolean }> {
  try {
    const response = await axios.post(`${Config.API_URL}/contact`, data);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'contact');
    captureException(error);
    return error;
  }
}

async function saveDeck(data: {}): Promise<{ data: boolean }> {
  try {
    const response = await axios.post(`${Config.API_URL}/deck`, data);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'saveDeck');
    captureException(error);
    return error;
  }
}

async function getSharedDeckBySharedId(sharedId: string): Promise<{ data: ResponseDeck }> {
  try {
    const response = await axios.get(`${Config.API_URL}/deck/${sharedId}`);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'getSharedDeckBySharedId');
    captureException(error);
    return error;
  }
}

async function saveOrUpdateCard(data: {
  deckId: number;
  question: string;
  answer: string;
  fontEndId: number;
  id: number | null;
  isEdit: boolean;
}): Promise<{ data: { fontEndId: number; cardId: number; question: string; answer: string; rank: null } }> {
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
    return error;
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
