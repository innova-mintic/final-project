import axios from "axios";

export const getToken = () => {
    return `Bearer ${localStorage.getItem('token')}`;
}

export const obtenerDatosUsuariosIngresados = async (successCallback, errorCallback) => {
    const options = { method: 'GET', 
    url: 'http://localhost:4000/usuarios/self',
    headers:{
    Authorization : getToken() 
    }, 
  };
  await axios.request(options)
  .then(successCallback)
  .catch(errorCallback);
  };