import axios from 'axios';
import { Card } from '../redux/reducer';

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

async function savePhoto(file: File): Promise<string[]> {
  const formData = new FormData();
  formData.append('photo', file as any);
  const response = await axios.post('http://localhost:3000/image', formData, {
    timeout: 15000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.photo;
}

async function contact(data: {}): Promise<{ data: boolean }> {
  try {
    const response = await axios.post('http://localhost:3000/contact', data);
    return response.data;
  } catch (error) {
    console.log('error', error); // FIXME add logger
    return error;
  }
}

async function saveDeck(data: {}): Promise<{ data: boolean }> {
  try {
    const response = await axios.post('http://localhost:3000/deck', data);
    return response.data;
  } catch (error) {
    console.log('error', error); // FIXME add logger
    return error;
  }
}

async function getSharedDeckBySharedId(sharedId: string): Promise<{ data: ResponseDeck }> {
  try {
    const response = await axios.get(`http://localhost:3000/deck/${sharedId}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

const Api = {
  savePhoto,
  contact,
  saveDeck,
  getSharedDeckBySharedId,
};

export default Api;
