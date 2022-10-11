import axios from 'axios';
import {
  SET_LOGGED_IN, GOOGLE_SIGNUP_SUCCESS, GOOGLE_SIGNUP_STARTED, GOOGLE_SIGNUP_FAILURE, SET_LOGGED_OUT, NORMAL_SIGNIN_FAILURE, NORMAL_SIGNIN_SUCCESS, NORMAL_SIGNIN_STARTED, NORMAL_SIGNUP_STARTED, NORMAL_SIGNUP_SUCCESS, NORMAL_SIGNUP_FAILURE
} from '../constants/tokenConstant';

export const setUserLoggedIn = (loginAction) => ({
  type: SET_LOGGED_IN,
  payload: loginAction
});

export const setUserLoggedOut = (userData) => ({
  type: SET_LOGGED_OUT,
  payload: userData
});

// Google Signin and Signup API call
export const googleSignup = (tokenId, values) => (dispatch) => {
  dispatch(googleSignupStarted());
  console.log(values);
  const data = {};
  if (values === undefined) {
    data.tokenId = tokenId;
  } else {
    data.schoolName = values.schoolname;
    data.state = values.state;
    data.city = values.city;
    data.tokenId = tokenId;
  }

  axios
    .post('http://localhost:3001/api/v1/auth/googleLogin/', data)
    .then((res) => {
      dispatch(googleSignupSuccess(res.data));
    })
    .catch((err) => {
      dispatch(googleSignupFailure(err.message));
    });
};

const googleSignupSuccess = (data) => ({
  type: GOOGLE_SIGNUP_SUCCESS,
  payload: {
    ...data
  }
});

const googleSignupStarted = () => ({
  type: GOOGLE_SIGNUP_STARTED
});

const googleSignupFailure = (error) => ({
  type: GOOGLE_SIGNUP_FAILURE,
  payload: {
    error
  }
});

// Manually Signin API call
export const normalSignin = (values) => (dispatch) => {
  dispatch(normalSigninStarted());
  // console.log(tokenId, values.schoolname);
  console.log(values);
  const data = {
    email: values.email,
    password: values.password
  };
  axios
    .post('http://localhost:3001/api/v1/auth/login/', JSON.stringify(data))
    .then((res) => {
      dispatch(normalSigninSuccess(res.data));
    })
    .catch((err) => {
      console.log('nor', err);
      dispatch(normalSigninFailure(err.message));
    });
};

const normalSigninSuccess = (data) => ({
  type: NORMAL_SIGNIN_SUCCESS,
  payload: {
    ...data
  }
});

const normalSigninStarted = () => ({
  type: NORMAL_SIGNIN_STARTED
});

const normalSigninFailure = (error) => ({
  type: NORMAL_SIGNIN_FAILURE,
  payload: {
    error
  }
});

// Manually Signup API call
export const normalSignup = (values) => (dispatch) => {
  dispatch(normalSignupStarted());
  // console.log(tokenId, values.schoolname);
  console.log(values);

  axios
    .post('http://localhost:3001/api/v1/auth/register/', {
      email: values.email,
      firstName: values.firstname,
      lastName: values.lastname,
      schoolName: values.schoolname,
      state: values.state,
      city: values.city,
      password: values.password

    })
    .then((res) => {
      dispatch(normalSignupSuccess(res.data));
    })
    .catch((err) => {
      dispatch(normalSignupFailure(err.message));
    });
};

const normalSignupSuccess = (data) => ({
  type: NORMAL_SIGNUP_SUCCESS,
  payload: {
    ...data
  }
});

const normalSignupStarted = () => ({
  type: NORMAL_SIGNUP_STARTED
});

const normalSignupFailure = (error) => ({
  type: NORMAL_SIGNUP_FAILURE,
  payload: {
    error
  }
});
