import {gql} from '@apollo/client'

const EDITAR_USUARIO = gql`
mutation EditarUsuario(
  $_id: String!, 
  $estado: Enum_EstadoUsuario!
  ) {
  editarUsuario(
    _id: $_id, 
    estado: $estado
    ) {
    nombre 
    estado
  }
}
`;

const ELIMINAR_USUARIO = gql`
  mutation EliminarUsuario(
    $id: String, 
    $correo: String
    ) {
    eliminarUsuario(
      _id: $id, 
      correo: $correo
      ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const CREAR_USUARIO = gql`
  mutation CrearUsuario(
    $nombre: String!, 
    $apellido: String!, 
    $identificacion: String!, 
    $correo: String!, 
    $rol: Enum_Rol!, 
    $estado: Enum_EstadoUsuario
    ) {
    crearUsuario(
      nombre: $nombre, 
      apellido: $apellido, 
      identificacion: $identificacion, 
      correo: $correo, 
      rol: $rol, 
      estado: $estado
      ) {
      _id
    }
  }
`;




export { EDITAR_USUARIO ,ELIMINAR_USUARIO,CREAR_USUARIO};


/*  deben ir los campos que se van actualizar  la base de datos en las ultimas llavesen */