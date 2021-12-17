import {gql} from '@apollo/client'


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

const EDITAR_PROYECTO = gql`
    mutation EditarProyecto(
    $id: String!, 
    $nombre: String!, 
    $presupuesto: String!, 
    $objetivoGeneral: String!
    ) {
    editarProyecto(
        _id: $id, 
        nombre: $nombre, 
        presupuesto: $presupuesto,
        objetivoGeneral: 
        $objetivoGeneral
        ) {
        nombre
        objetivoGeneral
    }
    }
`;

const ELIMINAR_OBJETIVO = gql`
    mutation EliminarObjetivo(
    $idProyecto: String!, $idObjetivo: String!
    ) {
    eliminarObjetivo(
        idProyecto: $idProyecto, 
        idObjetivo: $idObjetivo
        ) {
        nombre
        objetivoGeneral
        objetivosEspecificos {
        _id
        descripcion
        }
    }
    }
`;


export { EDITAR_PROYECTO,CREAR_PROYECTO,APROBAR_PROYECTO,ELIMINAR_OBJETIVO  };