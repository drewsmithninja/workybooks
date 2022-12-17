import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const user = localStorage.getItem('user');
const authToken = JSON.parse(user)?.payload?.verification?.token;

// getAssignments
// getAssignment
// getAssignmentByStudent
// getAssignmentsByStatus
// createAssignment
// updateAssignment
// deleteAssignment

const getAssignments = async (data) => {
  const response = await axios.post(`${API_URL}/assignment/list`, data, {
    headers: {
      authorization: authToken
    }
  });
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
  getAssignments
};

export default assignmentAPI;
