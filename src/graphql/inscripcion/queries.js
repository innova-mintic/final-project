import {gql} from '@apollo/client'

const GET_INSCRIPCIONES= gql`
    query SolicitudesInscripcion($_id: String!) {
    SolicitudesInscripcion(_id: $_id) {
        nombre
        proyectosLiderados {
        nombre
        inscripciones {
            estudiante {
            nombre
            apellido
            }
        }
        }
    }
    }

`;



export {GET_INSCRIPCIONES};