import Http from '../Http';
import * as action from '../store/actions';

const apiBase = 'https://healthdrop.nanosense.app';

export function login(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      dispatch(action.authLogin({"AccessToken":"qedqwdwedfwedew", "user":{"name":"Julian", "email":credentials.email}}));
      return resolve();
      // Http.post(apiBase + '/api/v1/auth/login', credentials)
      //   .then((res) => {
      //     dispatch(action.authLogin(res.data));
      //     return resolve();
      //   })
      //   .catch((err) => {
      //     const response = err.hasOwnProperty('response') ? err.response.data : {};
      //     const msg = ['Error logging in. No response from server.'];
      //     const { status = 403 , errors = msg } = response;
      //     const data = {
      //       status,
      //       errors,
      //     };
      //     return reject(data);
      //   });
    })
  );
}

export function register(credentials) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiBase + '/api/v1/auth/register', credentials)
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
