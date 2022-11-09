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

const collectionAPI = {
  createCollection
};

export default collectionAPI;
