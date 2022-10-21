import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// register user
const search = async (searchText) => {
  const response = await axios.post(`${API_URL}/worksheet/getBy/search `, searchText);
  return response.data;
};

const subjectTopic = async (searchText) => {
  const response = await axios.post(`${API_URL}/subject/getBy/subject/topic/worksheet `, searchText);
  return response.data;
};

const ccsTopic = async (searchText) => {
  const response = await axios.post(`${API_URL}/commonCoreStandard/getBy/ccs/topic/worksheet`, searchText);
  return response.data;
};

const searchAPI = {
  search,
  subjectTopic,
  ccsTopic
};

export default searchAPI;
