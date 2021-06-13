import axios, { AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';
import { captureException } from '@sentry/react-native';
import { Card } from '../redux/decks/reducer';
import { Logger } from '../service/Logger';
import { Cache } from '../utils/Cache';
import { refreshAccessToken } from '../modules/Auth/services/Auth0';

interface File {
  uri: string;
  name: string;
  type: string;
}

export interface ResponseDeck {
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
        return Promise.reject(error);
      } catch (e) {
        Logger.sendLocalError(e, 'interceptor error');
        captureException(e);
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

async function saveDeck(data: {}): Promise<{ data: ResponseDeck }> {
  try {
    const headers = await getHeaders();
    const response = await axios.post(`${Config.API_URL}/deck`, data, headers);
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
};

export default Api;
