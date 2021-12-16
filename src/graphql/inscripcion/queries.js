import {gql} from '@apollo/client'

const GET_INSCRIPCIONES= gql`
    query buscarInscripciones {
    Inscripciones {
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



export {GET_INSCRIPCIONES};