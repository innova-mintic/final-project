import {gql} from '@apollo/client'

const GET_USUARIOS = gql`
    query Usuarios{
        Usuarios {
        _id
        nombre
        apellido
        identificacion
        correo
        estado
        rol
        }
    }   
`;

const GET_USUARIO=gql`
    query Usuarios($_id: String!){
        Usuario(_id: $_id) {
            _id
            nombre
            apellido
            identificacion
            correo
            estado
            rol    
        }
    }
`;

const GET_ESTUDIANTES=gql`
    query BuscarEstudiantes($rol: Enum_Rol!){
    Estudiantes(rol: $rol) {
        nombre
        apellido
        identificacion
        correo
        rol
    }
    }
`;



export {GET_USUARIOS,GET_USUARIO,GET_ESTUDIANTES};