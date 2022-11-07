import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// register user
const search = async (searchText) => {
  const response = await axios.post(`${API_URL}/content/getBy/subGradeCcsTopic/search `, searchText);
  return response.data;
};

const searchSuggest = async (searchText) => {
  const response = await axios.post(`${API_URL}/content/getBy/keyw/ccs/sub/search `, searchText);
  return response.data;
};

const subjectTopic = async (searchText) => {
  const response = await axios.post(`${API_URL}/subject/getBy/subject/topic/content/list `, searchText);
  return response.data;
};

const ccsTopic = async (searchText) => {
  const response = await axios.post(`${API_URL}/commonCoreStandard/getBy/ccs/topic/content/list`, searchText);
  return response.data;
};

const searchAPI = {
  search,
  searchSuggest,
  subjectTopic,
  ccsTopic
};

export default searchAPI;
