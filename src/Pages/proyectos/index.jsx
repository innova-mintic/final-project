import React, {useEffect} from 'react';
import { useQuery } from '@apollo/client';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import { Enum_EstadoProyecto , Enum_FaseProyecto } from 'utils/enums';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';
import PrivateComponent from 'components/PrivateComponent';



const Proyectos= () => {
  const {data, error, loading}=useQuery(GET_PROYECTOS);

  console.log("los datos son",data); 

  if (loading) return <div> Cargando proyectos...</div>

  return (
    <div>
      <PrivateComponent rolelist={['rol']}>
        Datos Proyectos:
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre Proyecto</th>
              <th>Estado</th>
              <th>Fase</th>
              <th>Nombre Lider</th>
              <th>Apellido Lider</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Proyectos ? (
              <>
                {data.Proyectos.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{Enum_EstadoProyecto[u.estado]}</td>
                      <td>{Enum_FaseProyecto[u.fase]}</td>
                      <td>{u.lider.nombre}</td>
                      <td>{u.lider.apellido}</td>
                      <td>
                        <Link to={`/proyectos/editar/${u._id}`}>
                          <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
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
      </PrivateComponent>
        
    </div>
  )
};

export default Proyectos;
