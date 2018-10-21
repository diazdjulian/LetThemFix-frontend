import * as ActionTypes from '../action-types';
import Http from '../../Http';

const user = {
  id: null,
  name: null,
  email: null,
  accessToken: null,
  humanId: null,
  publicToken: null
};

const initialState = {
  isAuthenticated: false,
  user,
};

const authLogin = (state, payload) => {
  const { access_token: AccessToken, user } = payload;
  localStorage.setItem('access_token', AccessToken);
  localStorage.setItem('user', JSON.stringify(user));
  Http.defaults.headers.common.Authorization = `Bearer ${AccessToken}`;
  const stateObj = Object.assign({}, state, {
    isAuthenticated: true,
    user,
  });
  return stateObj;
};

const checkAuth = (state) => {
  const stateObj = Object.assign({}, state, {
    isAuthenticated: !!localStorage.getItem('access_token'),
    user: JSON.parse( localStorage.getItem('user') )
  });
  if (state.isAuthenticated) {
    Http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }
  return stateObj;
};

const logout = (state) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  const stateObj = Object.assign({}, state, {
    isAuthenticated: false,
    user,
  });
  return stateObj;
};

const humanApiConnection = (state, payload) => {
  let { user } = state;
  user.humanId = payload.humanId;
  user.publicToken = payload.publicToken;
  user.accessToken = payload.accessToken;
  localStorage.setItem('user', JSON.stringify(user));
  const stateObj = Object.assign({}, state, {
    isAuthenticated: !!localStorage.getItem('access_token'),
    user
  });
  return stateObj;
}

const Auth = (state = initialState, { type, payload = null }) => {
  switch (type) {
    case ActionTypes.AUTH_LOGIN:
      return authLogin(state, payload);
    case ActionTypes.AUTH_CHECK:
      return checkAuth(state);
    case ActionTypes.AUTH_LOGOUT:
      return logout(state);
    case ActionTypes.HUMAN_API_CONNECTION:
      return humanApiConnection(state, payload);
    default:
      return state;
  }
};

export default Auth;
