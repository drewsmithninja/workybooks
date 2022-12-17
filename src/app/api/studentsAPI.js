import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const user = localStorage.getItem('user');
const authToken = JSON.parse(user)?.payload?.verification?.token;

const createStudents = async (data) => {
  const res = await axios.post(`${API_URL}/student/create/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return res.data;
};

const getStudents = async (classId) => {
  const response = await axios.post(
    `${API_URL}/student/list`,
    {
      classId
    },
    {
      headers: {
        authorization: authToken
      }
    }
  );
  return response.data;
};

const getStudent = async (studentId) => {
  const response = await axios.post(
    `${API_URL}/student/getby/id`,
    {
      studentId
    },
    {
      headers: {
        authorization: authToken
      }
    }
  );
  return response.data;
};

const editStudent = async (data) => {
  const response = await axios.put(`${API_URL}/student/${data.studentId}`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const deleteStudent = async (studentId) => {
  const response = await axios.delete(`${API_URL}/student/${studentId}`, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const studentAPI = {
  createStudents,
  getStudents,
  getStudent,
  editStudent,
  deleteStudent
};

export default studentAPI;
