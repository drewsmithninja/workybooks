import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Favorite list
const favoriteData = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.get(`${API_URL}/content/favoriteList`, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

// My collection list
const collectionList = async (collectionData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.post(`${API_URL}/collection/list`, collectionData, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

// My collection Details
const collectionDetail = async (collectionId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.post(`${API_URL}/collection/getBy/id`, collectionId, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

// Recent list
const recentList = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.get(`${API_URL}/content/recent/contentList`, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const libraryAPI = {
  favoriteData,
  collectionList,
  collectionDetail,
  recentList
};

export default libraryAPI;
