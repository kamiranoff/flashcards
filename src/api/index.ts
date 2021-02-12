import axios from 'axios';

interface File {
  uri: string;
  name: string;
  type: string;
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
    console.log('error', error); // FIXME logger
    return error;
  }
}

async function saveDeck(data: {}): Promise<{ data: boolean }> {
  try {
    const d = { ...data, owner: 'anita' }; // FIXME ME
    const response = await axios.post('http://localhost:3000/deck', d);
    return response.data;
  } catch (error) {
    console.log('error', error); // FIXME logger
    return error;
  }
}

const Api = {
  savePhoto,
  contact,
  saveDeck,
};

export default Api;
