import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));
const authToken = user?.data?.token?.accessToken;

// worksheet details
const createCollection = async (collectionData) => {
  const response = await axios.post(`${API_URL}/collection`, collectionData, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const updateCollection = async (data) => {
  const body = {
    favorite: false,
    content: [data.worksheetId]
  };
  const response = await axios.put(`${API_URL}/collection/${data.collectionId}`, body, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const updateCollectionLike = async (data) => {
  const response = await axios.put(`${API_URL}/collection/${data.collectionId}`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const collectionAPI = {
  createCollection,
  updateCollection,
  updateCollectionLike
};

export default collectionAPI;
