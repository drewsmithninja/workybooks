import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// getAssignments // done
// getAssignment
// getAssignmentByStudent
// getAssignmentsByStatus // done
// createAssignment
// updateAssignment
// deleteAssignment

const getAssignments = async (classId) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(
    `${API_URL}/assignment/list`,
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

const getSubmittedAssignments = async (studentId) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(
    `${API_URL}/submittedAssignment/getListBy/student`,
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

const getAssignmentsByStatus = async (data) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(`${API_URL}/assignment/getBy/status/list`, data, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const getAssignmentsByStudent = async (studentId) => {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;
  const response = await axios.post(
    `${API_URL}/assignment/getBy/student`,
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

// reference
// const createClass = async (classData) => {
//   const response = await axios.post(`${API_URL}/classroom`, classData, {
//     headers: {
//       authorization: authToken
//     }
//   });
//   return response.data;
// };

const assignmentAPI = {
  getAssignments,
  getAssignmentsByStatus,
  getAssignmentsByStudent,
  getSubmittedAssignments
};

export default assignmentAPI;
