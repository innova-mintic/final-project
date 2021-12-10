import {gql} from '@apollo/client'

const EDITAR_PROYECTO = gql`
    mutation EditarProyecto(
    $nombre: String, 
    $presupuesto: String, 
    $fechaInicio: Date, 
    $fechaFin: Date, 
    $estado: Enum_EstadoProyecto, 
    $fase: Enum_FaseProyecto, 
    $lider: String
    ) {
    editarProyecto(
        _id: $_id, 
        nombre: $nombre, 
        presupuesto: $presupuesto, 
        fechaInicio: $fechaInicio, 
        fechaFin: $fechaFin, 
        estado: $estado, 
        fase: $fase, 
        lider: $lider
        ) {
        nombre
        fase
        presupuesto
        fechaInicio
        fechaFin
        estado
    }
}
`;

const CREAR_PROYECTO = gql`
    mutation CrearProyecto(
    $nombre: String!, 
    $presupuesto: String!, 
    $fechaInicio: Date!, 
    $lider: String!
    ) {
    crearProyecto(
        nombre: $nombre, 
        presupuesto: $presupuesto, 
        fechaInicio: $fechaInicio, 
        lider: $lider
        ) {
        nombre
        presupuesto
    }
    }
`;




export { EDITAR_PROYECTO,CREAR_PROYECTO };