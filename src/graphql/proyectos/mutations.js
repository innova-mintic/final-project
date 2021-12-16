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
    $lider: String!, 
    $objetivoGeneral: String!, 
    $objetivosEspecificos: [crearObjetivo]!
    ) {
    crearProyecto(
        nombre: $nombre, 
        presupuesto: $presupuesto, 
        fechaInicio: $fechaInicio, 
        lider: $lider, 
    
        objetivoGeneral: $objetivoGeneral, 
    
        objetivosEspecificos: $objetivosEspecificos
        ) {
        nombre
        presupuesto
    }
    } 
`;

const APROBAR_PROYECTO = gql`
    mutation AprobarProyecto(
    $_id: String!, 
    $estado: Enum_EstadoProyecto!, 
    $fase: Enum_FaseProyecto!
    ) {
    aprobarProyecto(
        _id: $_id, 
        estado: $estado, 
        fase: $fase
        ) {
        _id
        estado
        fase
    }
    }
`;



export { EDITAR_PROYECTO,CREAR_PROYECTO,APROBAR_PROYECTO };