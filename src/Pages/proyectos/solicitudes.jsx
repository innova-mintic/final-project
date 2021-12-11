import React  from 'react';
import { useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import PrivateComponent from 'components/PrivateComponent';

import { Enum_EstadoProyecto } from 'utils/enums';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';



const Solicitudes= () => {
  const {data, error, loading}=useQuery(GET_PROYECTOS);
  console.log("los datos son",data); 

  if (loading) return <div> Cargando solicitudes...</div>

  return (
    <div>
      <PrivateComponent roleList={['rol']}>
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
            {data && data.Proyectos ? (
              <>
                {data.Proyectos.map((u) => {
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
      </PrivateComponent>
        
    </div>
  )
};

export default Solicitudes;
