import { SET_LOGGED_IN } from '../constants/tokenConstant';

const initialState = {
  loggedIn: false,
  userData: {
  }
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
    default:
      return state;
  }
};

export default userReducer;
