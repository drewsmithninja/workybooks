import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem('user'));
const authToken = user?.data?.token?.accessToken;

// New worksheet list
const newWorksheet = async (worksheetData) => {
  const response = await axios.post(`${API_URL}/content/list`, worksheetData, {
    headers: {
      Authorization: authToken
    }
  });
  return response.data;
};

// Subject list
const listSubject = async (subjectData) => {
  const response = await axios.post(`${API_URL}/subject/list`, subjectData);
  return response.data;
};

// CCS list
const listCCL = async (ccsData) => {
  const response = await axios.post(`${API_URL}/commonCoreStandard/list`, ccsData);
  return response.data;
};

// Grade list
const listGrade = async (gradeData) => {
  const response = await axios.post(`${API_URL}/grade/list`, gradeData);
  return response.data;
};

const homeAPI = {
  newWorksheet,
  listSubject,
  listCCL,
  listGrade
};

export default homeAPI;
