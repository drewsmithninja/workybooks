import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getStudents = async (classId) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.post(`${API_URL}/student/list`, {
    classId
  }, {
    headers: {
      authorization: authToken
    }
  });
  console.log(response.data);
  return response.data;
};

const studentAPI = {
  getStudents
};

export default studentAPI;
