import axios from 'axios';
import store from './store';
import * as actions from './store/actions';

// API for App
export const appApiBase = 'localhost:3030';

const token = localStorage.getItem('accessToken');
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(actions.authLogout());
    }
    return Promise.reject(error);
  },
);

export default axios;