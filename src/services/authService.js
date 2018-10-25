import Http from '../Http';
import * as action from '../store/actions';
import axios from 'axios';

const apiBase = 'http://localhost:8080/tp_fixers/';

export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiBase + 'actionLogin', credentials)
        .then((res) => {
          dispatch(action.authLogin(res.data));
          return resolve();
        })
        .catch((err) => {
          const response = err.hasOwnProperty('error') ? err.error : {};
          const msg = ['Error logging in. No response from server.'];
          const { status = 403 , errors = msg } = response;
          const data = {
            status,
            errors,
          };
          return reject(data);
        });
    })
  );
}

export function register(userType, registerData) {
  if (userType === 'user') {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiBase + 'actionClientes', registerData)
          .then(res => resolve(res.data))
          .catch((err) => {
            const error = err.error;
            return reject(error);
          });
      })
    );
  } else {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.post(apiBase + 'actionProfesionales', registerData)
          .then(res => resolve(res.data))
          .catch((err) => {
            const error = err.error;
            return reject(error);
          });
      })
    );
  }
}

export function resetPassword(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiBase + '/api/v1/auth/forgot-password', credentials)
        .then(res => resolve(res.data))
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
        });
    })
  );
}

export function updatePassword(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiBase + '/api/v1/auth/password-reset', credentials)
        .then((res) => {
          const { status } = res.data.status;
          if (status === 202) {
            const data = {
              error: res.data.message,
              status,
            };
            return reject(data);
          }
          return resolve(res);
        })
        .catch((err) => {
          const { status, errors } = err.response.data;
          const data = {
            status,
            errors,
          };
          return reject(data);
        });
    })
  );
}
