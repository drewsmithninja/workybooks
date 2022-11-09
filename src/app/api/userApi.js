import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// register user
const getProfile = async (userId) => {
  const response = await axios.post(`${API_URL}/user/getBy/id`, userId);
  return response.data;
};

// login user
const updateProfile = async (userInfo) => {
  // console.log('udata', userInfo);
  const response = await axios.put(`${API_URL}/user/${userInfo?.id}`, userInfo?.userDetail);
  return response.data;
};

const userAPI = {
  getProfile,
  updateProfile
};

export default userAPI;
