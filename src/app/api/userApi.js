import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// register user
const getProfile = async (userId) => {
  const response = await axios.post(`${API_URL}/user/getBy/id`, userId);
  return response.data;
};

// login user
const updateProfile = async (userData) => {
  const response = await axios.post(`${API_URL}/user/id`, userData);
  return response.data;
};

const userAPI = {
  getProfile,
  updateProfile
};

export default userAPI;
