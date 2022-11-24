import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

// worksheet details
const createCollection = async (collectionData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.post(`${API_URL}/collection`, collectionData, {
    headers: {
      authorization: authToken
    }
  });
  toast.success(response.data.message);
  return response.data;
};

const updateCollection = async (data) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const body = {
    favorite: false,
    content: [data.worksheetId]
  };
  const response = await axios.put(`${API_URL}/collection/${data.collectionId}`, body, {
    headers: {
      authorization: authToken
    }
  });
  toast.success(response.data.message);
  return response.data;
};

const updateCollectionLike = async (data) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
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
