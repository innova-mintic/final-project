import {gql} from '@apollo/client'

const GET_AVANCES=gql`
    query BuscarAvances(
    $_id: String!
    ) {
    buscarAvances(
        _id: $_id
        ) {
        descripcion
        fecha
        creadoPor {
            nombre
            apellido
        }
    }
    }
`;



export {GET_AVANCES};