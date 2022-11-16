import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

const verifyEmail = async (id) => {
  const response = await axios.post(`${API_URL}/auth/verify-email`, id, {
    headers: {
      authorization: id
    }
  });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const forgotPassword = async (emailId) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, emailId);
  toast.success('A password reset link was sent. Click the link in the email to create a new password.');
  return response.data;
};

const resetPassword = async (data) => {
  const { id, pass } = data;
  const response = await axios.post(`${API_URL}/auth/reset-password`, pass, {
    headers: {
      authorization: id
    }
  });
  if (id && pass) {
    toast.success('Password has been Reset!');
  }
  return response.data;
};

const logout = () => {
  // localStorage.removeItem('user');
  localStorage.clear();
};

const authAPI = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  verifyEmail
};

export default authAPI;
