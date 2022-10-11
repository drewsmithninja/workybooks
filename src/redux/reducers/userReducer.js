import {
  SET_LOGGED_IN, GOOGLE_SIGNUP_STARTED, GOOGLE_SIGNUP_SUCCESS, GOOGLE_SIGNUP_FAILURE, SET_LOGGED_OUT, NORMAL_SIGNIN_STARTED, NORMAL_SIGNIN_SUCCESS, NORMAL_SIGNIN_FAILURE, NORMAL_SIGNUP_STARTED, NORMAL_SIGNUP_SUCCESS, NORMAL_SIGNUP_FAILURE
} from '../constants/tokenConstant';

const initialState = {
  loggedIn: false,
  userData: {},
  googleAuthId: '',
  error: null
};

// eslint-disable-next-line default-param-last
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // token create network
    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        userData: action.payload
      };
    case GOOGLE_SIGNUP_STARTED:
      return {
        ...state
      };
    case GOOGLE_SIGNUP_SUCCESS:
      return {
        ...state,
        userData: action.payload
      };
    case GOOGLE_SIGNUP_FAILURE:
      return {
        ...state,
        error: null
      };
    case NORMAL_SIGNIN_STARTED:
      return {
        ...state
      };
    case NORMAL_SIGNIN_SUCCESS:
      return {
        ...state,
        userData: action.payload
      };
    case NORMAL_SIGNIN_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case NORMAL_SIGNUP_STARTED:
      return {
        ...state
      };
    case NORMAL_SIGNUP_SUCCESS:
      return {
        ...state,
        userData: action.payload
      };
    case NORMAL_SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
