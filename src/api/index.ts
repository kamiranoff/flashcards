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

const Api = {
  savePhoto,
};

export default Api;
