import React  from 'react';
import {useParams, Link} from 'react-router-dom'
import { useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';

import { Enum_EstadoInscripcion } from 'utils/enums';
import { GET_INSCRIPCIONES_ESTUDIANTE } from 'graphql/inscripcion/queries';
import { GET_USUARIO } from 'graphql/usuarios/queries';


const MisInscripciones= () => {

  const _id='61be06a9179749635239e3ca'

  const{data:queryDataUsuario,error:queryErrorUsuario,loading:queryLoadingUsuario}=useQuery(GET_USUARIO,{
      variables:{_id}
  });

  const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_INSCRIPCIONES_ESTUDIANTE,{variables:{_id} });

  if (queryLoadingUsuario) return <div> Cargando inscripciones...</div>
  if (queryLoading) return <div> Cargando inscripciones...</div>

    return (
      <div>
          <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Inscripciones realizadas:</h1>
          <span className='uppercase flex flex-col items-center justify-center text-blue-600'>Estudiante: {queryDataUsuario.Usuario.nombre + ' ' + queryDataUsuario.Usuario.apellido}</span>
          <table className='tabla'>
            <thead>
              <tr>
                <th>Proyecto Solicitado</th>
                <th>Lider</th>
                <th>Estado de Inscripcion</th>
                <th>Fecha de ingreso</th>
              </tr>
            </thead>
            <tbody>
              {queryData && queryData.FiltrarInscripcionPorEstudiante ? (
                <>
                  {queryData.FiltrarInscripcionPorEstudiante.map((u) => {
                    return (
                      <tr key={u._id}>
                        <td>{u.proyecto.nombre}
                        <Link to={`/proyectos/editar/${u.proyecto._id}`}>
                            <i className='fas fa-external-link-square-alt text-gray-600 hover:text-yellow-400 cursor-pointer px-3' />
                        </Link>
                        </td>    
                        <td>{u.proyecto.lider.nombre} {u.proyecto.lider.apellido}</td>
                        <td>{Enum_EstadoInscripcion[u.estado]}</td>
                        <td>
                          {u.fechaIngreso ?(
                            <>
                              {u.fechaIngreso.slice(0,-14)}
                            </>
                            ):(
                              <>Sin aceptar</>
                            )}    
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

export default MisInscripciones;
