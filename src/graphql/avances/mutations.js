import {gql} from '@apollo/client'

const CREAR_AVANCE = gql`
    mutation CrearAvance(
    $descripcion: String!, 
    $proyecto: String!, 
    $creadoPor: String!
    ) {
    crearAvance(
        descripcion: $descripcion, 
        proyecto: $proyecto, 
        creadoPor: $creadoPor
        ) {
        _id
        fecha
        descripcion
    }
    }
`;



export {CREAR_AVANCE};