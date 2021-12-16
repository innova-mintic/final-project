import React  from 'react';
import { useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';

import { Enum_EstadoInscripcion } from 'utils/enums';
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';
import { GET_USUARIO } from 'graphql/usuarios/queries';


const MisInscripciones= () => {

  const _id='61b940251ff3c450b7b85a8f'

  const{data:queryDataUsuario,error:queryErrorUsuario,loading:queryLoadingUsuario}=useQuery(GET_USUARIO,{
      variables:{_id}
  });

  const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_INSCRIPCIONES);

  if (queryLoadingUsuario) return <div> Cargando solicitudes...</div>
  if (queryLoading) return <div> Cargando solicitudes...</div>

  console.log("estudiante",queryDataUsuario ) ;

  console.log("los datos son",queryData.Inscripciones.map( (u)=> u.estudiante.nombre ) ) ; 

    return (
      <div>
          <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Inscripciones realizadas:</h1>
          <span className='uppercase flex flex-col items-center justify-center text-blue-600'>Estudiante: {queryDataUsuario.Usuario.nombre + ' ' + queryDataUsuario.Usuario.apellido}</span>
          <table className='tabla'>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Correo</th>
                <th>Proyecto</th>
                <th>Estado</th>
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
                        <td>{Enum_EstadoInscripcion[u.estado]}</td>
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
