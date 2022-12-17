import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const user = localStorage.getItem('user');
const authToken = JSON.parse(user)?.payload?.verification?.token;

const createClass = async (classData) => {
  const response = await axios.post(`${API_URL}/classroom`, classData, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const editClass = async (data) => {
  const response = await axios.put(`${API_URL}/classroom/${data.classId}`, data.values, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

// const getClassRoomOptions = async () => {
//   const response = await axios.get(`${API_URL}/classroom/optionList`, {
//     headers: {
//       authorization: authToken
//     }
//   });
//   return response.data;
// };

const getClassrooms = async (data) => {
  const response = await axios.post(`${API_URL}/classroom/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getClassroom = async (id) => {
  const response = await axios.post(
    `${API_URL}/classroom/getBy/id`,
    {
      id
    },
    {
      headers: {
        authorization: authToken
      }
    }
  );
  return response.data;
};

const classroomAPI = {
  createClass,
  editClass,
  // getClassRoomOptions
  getClassrooms,
  getClassroom
};

export default classroomAPI;
