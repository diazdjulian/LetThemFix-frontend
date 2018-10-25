import * as ActionTypes from '../action-types';
import Http from '../../Http';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authLogin = (state, payload) => {
  localStorage.setItem('user', JSON.stringify(payload));
  const stateObj = Object.assign({}, state, {
    isAuthenticated: true,
    user: JSON.parse( localStorage.getItem('user') ),
  });
  return stateObj;
};

const checkAuth = (state) => {
  const stateObj = Object.assign({}, state, {
    isAuthenticated: !!localStorage.getItem('user'),
    user: JSON.parse( localStorage.getItem('user') )
  });
  return stateObj;
};

const logout = (state) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  const stateObj = Object.assign({}, state, {
    isAuthenticated: false,
    user: null,
  });
  return stateObj;
};

const Auth = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.AUTH_LOGIN:
      return authLogin(state, payload);
    case ActionTypes.AUTH_CHECK:
      return checkAuth(state);
    case ActionTypes.AUTH_LOGOUT:
      return logout(state);
    default:
      return state;
  }
};

export default Auth;
