import Http, { appApiBase } from '../Http';

export function licitar(licitacion) {
  return (
    new Promise((resolve, reject) => {
      Http.post(`${appApiBase}/licitacion/licitar`, licitacion)
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
  return (
    new Promise((resolve, reject) => {
      Http.post(`${appApiBase}/publicacion/publicar`, publicacion)
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
