import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getClassRoomOptions = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const response = await axios.get(`${API_URL}/classroom/optionList`, {
    headers: {
      authorization: authToken
    }
  });
  return response.data;
};

const classRoomAPI = {
  getClassRoomOptions
};

export default classRoomAPI;
