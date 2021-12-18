import {gql} from '@apollo/client'


const CREAR_INSCRIPCION= gql`
    mutation CrearInscripcion(
    $proyecto: String!, 
    $estudiante: String!
    ) {
    crearInscripcion(
        proyecto: $proyecto, 
        estudiante: $estudiante
        ) {
        _id
        estado
    }
    }
`;

const APROBAR_INSCRIPCION= gql`
    mutation AprobarInscripcion(
    $_id: String!, 
    $estado: Enum_EstadoInscripcion!
    ) {
    aprobarInscripcion(
        _id: $_id, 
        estado: $estado
        ) {
        estado
    }
    }
`;


export { CREAR_INSCRIPCION,APROBAR_INSCRIPCION };