import Http from '../Http';
import * as action from '../store/actions';

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
          return reject(err.response);
        });
    })
  );
}

export function retrieveUser(userType, nroFiscal) {
  if (userType === 'user') {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiBase + 'actionClientes?nroFiscal=' + nroFiscal)
          .then(res => {
            dispatch(action.reloadUser(res.data));
            return resolve();
          })
          .catch((err) => {
            const error = err.error;
            return reject(error);
          });
      })
    );
  } else {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.get(apiBase + 'actionProfesionales?nroFiscal=' + nroFiscal)
        .then(res => {
          dispatch(action.reloadUser(res.data));
          return resolve();
        })
          .catch((err) => {
            const error = err.error;
            return reject(error);
          });
      })
    );
  }
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
