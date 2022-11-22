import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getStudents = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.get(`${API_URL}/student/list`, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const studentAPI = {
  getStudents
};

export default studentAPI;
