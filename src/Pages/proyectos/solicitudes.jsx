import React  from 'react';
import { useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from 'components/PrivateComponent';

import { Enum_EstadoProyecto } from 'utils/enums';
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';



const Solicitudes= () => {

  const _idLider='61ae26807de7e64c94128677'

  const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_INSCRIPCIONES,{
    variables:{_id:_idLider}
});



if (queryLoading) return <div> Cargando solicitudes...</div>

console.log("los datos son",queryData.SolicitudesInscripcion.proyectosLiderados.map( (u)=> u.inscripciones ) ) ; 

  return (
    <div>
        Lista de solicitudes:
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
            {queryData && queryData.Proyectos ? (
              <>
                {queryData.Proyectos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.lider.nombre}</td>
                      <td>{u.lider.correo}</td>
                      <td>{u.nombre}</td>
                      <td>{Enum_EstadoProyecto[u.estado]}</td>
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
