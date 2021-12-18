import React  from 'react';
import { useQuery } from '@apollo/client';
import {useParams, Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from 'components/PrivateComponent';

import { Enum_EstadoProyecto } from 'utils/enums';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';



  const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_INSCRIPCIONES);
  
  if (queryLoadingUsuario) return <div> Cargando solicitudes...</div>
  if (queryLoading) return <div> Cargando solicitudes...</div>

    return (
      <div>
          <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Lista de solicitudes de estudiantes:</h1>
          <span className='uppercase flex flex-col items-center justify-center text-blue-600'>Lider del proyecto: {queryDataUsuario.Usuario.nombre + ' ' + queryDataUsuario.Usuario.apellido}</span>
          <table className='tabla'>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Correo</th>
                <th>Proyecto Solicitado</th>
                <th>Estado de Inscripcion</th>
              </tr>
            </thead>
            <tbody>
              {queryData && queryData.Inscripciones ? (
                <>
                  {queryData.Inscripciones.map((u) => {
                    return (
                      <tr key={u._id}>
                        <td>{u.estudiante.nombre} {u.estudiante.apellido}</td>
                        <td>{u.estudiante.correo}</td>
                        <td>{u.proyecto.nombre}</td>
                        <td>{Enum_EstadoInscripcion[u.estado]}
                          <Link to={`/solicitudes/editar/${u._id}`}>
                            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer px-3' />
                          </Link> 
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <div> No autorizado </div>
              )}
            </tbody>
          </table>
      </div>
    )
  };

export default Solicitudes;
