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
        _id
        nombre
        presupuesto
        fechaInicio
        fechaFin
        estado
        fase
        objetivoGeneral
        objetivosEspecificos{
            _id
            descripcion
                }
        lider {
            nombre
            apellido
            }
        inscripciones {
            _id
            estado
            fechaIngreso
            estudiante{
                _id
                nombre
                apellido
                }
             }
        avances {
             descripcion
             }
        }
    }
`;

const GET_PROYECTO_LIDER=gql`
    query FiltrarProyectoPorLider($_id: String!) {
    FiltrarProyectoPorLider(_id: $_id) {
        _id
        nombre
        lider {
        nombre
        apellido
        }
        fase
        estado
    }
    }
`;


export {GET_PROYECTOS,GET_PROYECTO,GET_PROYECTO_LIDER};
