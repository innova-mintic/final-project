import {gql} from '@apollo/client'

const GET_INSCRIPCIONES= gql`
    query buscarInscripciones {
    Inscripciones {
        _id
        estado
        proyecto {
            _id
            nombre
            lider {
                _id
            }
        }
        estudiante {
        _id
        nombre
        apellido
        correo
        }
    }
    }
`;

const GET_INSCRIPCIONES_ESTUDIANTE= gql`
    query FiltrarInscripcionPorEstudiante(
    $_id: String!
    ) {
    FiltrarInscripcionPorEstudiante(
        _id: $_id
        ) {
        _id
        estado
        fechaIngreso
        proyecto {
            _id
            nombre
            lider {
                _id
                nombre
                apellido
            }
        }
    }
    }
`;

const GET_INSCRIPCION= gql`
    query FiltrarInscripcion(
    $_id: String!
    ) {
    FiltrarInscripcion(
        _id: $_id
        ) {
        estado
        fechaIngreso
        estudiante {
        nombre
        apellido
        correo
        inscripciones {
            estado
            proyecto {
                nombre
                }
        }
        }
    }
    }
`;



export {GET_INSCRIPCIONES,GET_INSCRIPCIONES_ESTUDIANTE, GET_INSCRIPCION};