import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// register user
const search = async (searchText) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.post(`${API_URL}/content/getBy/subGradeCcsTopic/search`, searchText, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const searchSuggest = async (searchText) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.post(`${API_URL}/content/getBy/keyw/ccs/sub/suggestion/search`, searchText, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const subjectTopic = async (searchText) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.post(`${API_URL}/subject/getBy/subject/topic/content/list`, searchText);
  return response.data;
};

const ccsTopic = async (searchText) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
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
