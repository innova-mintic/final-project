import {gql} from '@apollo/client'

const GET_PROYECTOS= gql`
    query Query {
        Proyectos {
        _id
        nombre
        estado
        fase
        lider {
            nombre
            apellido
            correo
        }
        }
    }
`;

const GET_PROYECTO=gql`
    query BuscarUnProyecto($_id: String!) {
        Proyecto(_id: $_id) {
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
        lider {
            nombre
            apellido
            }
        inscripciones {
            _id
            estado
             }
        avances {
             descripcion
             }
        }
    }
`;

const GET_AVANCES=gql`
    query BuscarAvances($_id: String!) {
    buscarAvances(_id: $_id) {
        descripcion
    }
    }
`;



export {GET_PROYECTOS,GET_PROYECTO,GET_AVANCES};