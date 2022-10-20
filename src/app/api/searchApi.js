import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// register user
const search = async (searchText) => {
  const response = await axios.post(`${API_URL}/worksheet/search `, searchText);
  return response.data;
};

const searchAPI = {
  search
};

export default searchAPI;
