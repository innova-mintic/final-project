import {gql} from '@apollo/client'

const EDITAR_PERFIL = gql`
mutation EditarPerfil(
  $_id: String!, 
  $nombre: String!, 
  $apellido: String!, 
  $identificacion: String!, 
  $correo: String!
    ) {
    editarPerfil(
      _id: $_id, 
      nombre: $nombre, 
      apellido: $apellido, 
      identificacion: 
      $identificacion, 
      correo: $correo
      ) {
      nombre
      apellido
      identificacion
      correo
      estado
      rol
    }
  }
`;





export { EDITAR_PERFIL };


/*  deben ir los campos que se van actualizar  la base de datos en las ultimas llavesen */