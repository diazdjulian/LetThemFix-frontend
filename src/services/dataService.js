import Http, { appApiBase } from '../Http';

const apiBase = 'http://localhost:8080/tp_fixers/';

export function licitar(licitacion) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiBase + 'actionPresupuestos', licitacion)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          console.log(error);
          return reject(error);
        });
    })
  );
}

export function publicar(publicacion) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.post(apiBase + 'actionProblemas', publicacion)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err.response);
        });
    })
  );
}

export function aceptarLicitacion(idPresupuesto, problemId) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.put(apiBase + 'actionPresupuestos', {"idPresupuesto": idPresupuesto, "idProblema": problemId})
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          console.log(error);
          return reject(error);
        });
    })
  );
}

export function eliminarProblema(problemId) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiBase + 'actionProblemas?idProblemaEliminar=' + problemId)
        .then((response) => {
          return resolve(response);
        })
        .catch((error) => {
          console.log(error);
          return reject(error);
        });
    })
  );
}

export function obtenerProblema(idProblema) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiBase + 'actionProblemas?problemaId=' + idProblema)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err.response);
        });
    })
  );
}

export function obtenerProblemasTodos() {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiBase + 'actionProblemas')
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err.response);
        });
    })
  );
}

export function obtenerProblemasDeCliente(idCliente) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiBase + 'actionProblemas?clienteId=' + idCliente)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err.response);
        });
    })
  );
}

export function obtenerPresupuestosDeProblema(idProblema) {
  return dispatch => (
    new Promise((resolve, reject) => {
      Http.get(apiBase + 'actionPresupuestos?problemaId=' + idProblema)
        .then((res) => {
          return resolve(res.data);
        })
        .catch((err) => {
          return reject(err.response);
        });
    })
  );
}

export function actualizarUsuario(userType, newUserData) {
  if (userType === 'user') {
    return dispatch => (
      new Promise((resolve, reject) => {
        Http.put(apiBase + 'actionClientes', newUserData)
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
        Http.put(apiBase + 'actionProfesionales', newUserData)
          .then(res => resolve(res.data))
          .catch((err) => {
            const error = err.error;
            return reject(error);
          });
      })
    );
  }
}