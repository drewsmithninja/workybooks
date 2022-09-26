import { SET_LOGGED_IN } from '../constants/tokenConstant';

const setUserLoggedIn = (loginAction) => ({
  type: SET_LOGGED_IN,
  payload: loginAction
});

export default setUserLoggedIn;
