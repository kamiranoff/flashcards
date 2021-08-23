import axios, { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';
import { captureException } from '@sentry/react-native';
import { Card } from '../redux/decks/reducer';
import { Logger } from '../service/Logger';
import { CreateResponse, GetDeckBySharedIdResponse } from './types';
import { CreateDeckResponse } from '../../../flashcards-api/src/db/types';
import { Cache } from '../utils/Cache';
import { refreshAccessToken } from '../modules/Auth/services/Auth0';
import { store } from '../redux/store';
import { deleteUser } from '../redux/user/actions';
import { pusher } from '../service/pusher';

interface File {
  uri: string;
  name: string;
  type: string;
}

export interface ResponseDeck {
  id: string;
  title: string;
  owner: string;
  shareId: string;
  cards: Card[];
  isPublic: boolean;
  deckId: number;
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errorResponse = error.response;
    if (errorResponse && errorResponse.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await Cache.getRefreshToken();
        if (typeof refreshToken === 'string') {
          const response = await refreshAccessToken(refreshToken);
          if (!response) {
            throw new Error('could not refresh access token');
          }
          await Cache.setAccessToken(response.accessToken);

          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
          return axios(originalRequest);
        }
        Logger.sendLocalError(error, 'interceptor error');
        captureException(error);
        store.dispatch(deleteUser());
        await Cache.deleteTokens();
        return Promise.reject(error);
      } catch (e) {
        Logger.sendLocalError(e, 'interceptor error');
        captureException(e);
        store.dispatch(deleteUser());
        await Cache.deleteTokens();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

const getHeaders = async () => {
  const token = await Cache.getAccessToken();
  const headers: AxiosRequestConfig = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
  };
  return headers;
};

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
    const headers = await getHeaders();
    const response: CreateDeckResponse = await axios.post(`${Config.API_URL}/deck`, data, headers);
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

export type CreateCardsResponse =
  | {
      cards: {
        frontendId: number;
        id: number;
        question: string;
        answer: string;
        rank: null;
        isPublic: boolean;
        owner: string | null;
      }[];
    }
  | { error: string };

async function createCards(
  deckId: number,
  cards: {
    frontendId: number;
    id: null;
    question: string;
    answer: string;
    rank: number | null;
    isPublic: boolean;
    owner: string | null;
  }[],
): Promise<CreateCardsResponse> {
  try {
    const headers = await getHeaders();
    const response = await axios.post<CreateCardsResponse>(
      `${Config.API_URL}/cards`,
      { deckId, cards },
      headers,
    );
    if (!response.data) {
      throw new Error('no data found');
    }

    if ('error' in response.data) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'createCards');
    captureException(error);
    throw error;
  }
}

export type SaveOrUpdateCardResponse =
  | {
      frontendId: number;
      id: number;
      question: string;
      answer: string;
      rank: number | null;
    }
  | { error: string };

async function saveOrUpdateCard(data: {
  deckId: number;
  question: string;
  answer: string;
  frontendId: number;
  id: number | null;
  isEdit: boolean;
}): Promise<SaveOrUpdateCardResponse> {
  try {
    const headers = await getHeaders();
    let response;

    if (data.isEdit && data.id) {
      // update card
      response = await axios.put<SaveOrUpdateCardResponse>(
        `${Config.API_URL}/card/${data.id}`,
        { ...data, socket_id: pusher?.connection.socket_id },
        headers,
      );
      return response.data;
    }
    // save new card
    response = await axios.post<SaveOrUpdateCardResponse>(
      `${Config.API_URL}/card`,
      { ...data, socket_id: pusher?.connection.socket_id },
      headers,
    );
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'saveOrUpdateCard');
    captureException(error);
    throw error;
  }
}

async function saveUser(): Promise<{ data: boolean }> {
  try {
    const headers = await getHeaders();
    const response = await axios.post(`${Config.API_URL}/users`, null, headers);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'saveUser');
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
  saveUser,
  createCards,
};

export default Api;
