import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// forgot password
const forgotPassword = async (emailId) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, emailId);
  return response.data;
};

// reset password
const resetPassword = async (userPass) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, userPass);
  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authAPI = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout
};

export default authAPI;
