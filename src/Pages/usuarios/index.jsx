import React, {useEffect,useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { ELIMINAR_USUARIO } from 'graphql/usuarios/mutations';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import { Enum_Rol , Enum_EstadoUsuario } from 'utils/enums';
import { Tooltip, Dialog } from '@material-ui/core';
import ButtonLoading from 'components/ButtonLoading';
import PrivateComponent from 'components/PrivateComponent';

const Usuarios= () => {
  const {data, error, loading}=useQuery(GET_USUARIOS);
  const [eliminarUsuario, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(ELIMINAR_USUARIO);

  console.log("los datos son",data); 
  const [openDialog, setOpenDialog] = useState(false);

  if (loading) return <div> Cargando usuarios...</div>

  return (
    <div>
        Datos Usuarios:
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Usuarios ? (
              <>
                {data.Usuarios.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u.nombre}</td>
                      <td>{u.apellido}</td>
                      <td>{u.correo}</td>
                      <td>{u.identificacion}</td>
                      <td>{Enum_Rol[u.rol]}</td>
                      <td>{Enum_EstadoUsuario[u.estado]}</td>
                      <td>
                        <div>
                          <Link to={`/usuarios/editar/${u._id}`}>
                            <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                          </Link>
                          <Tooltip title='Eliminar producto' arrow>   
                            <i onClick={()=>setOpenDialog(true) } className='fas fa-trash text-red-700 hover:text-red-500'  />
                          </Tooltip>


                        </div>
                        <Dialog open={openDialog}>
                            <div className='p-8 flex flex-col'>
                                <h1 className='text-gray-900 text-2xl font-bold'>
                                ¿Está seguro de querer eliminar el usuario?
                                </h1>
                                <div className='flex w-full items-center justify-center my-4'>
                                    <ButtonLoading
                                        disabled={false}
                                        loading={mutationLoading}
                                        text='Si'
                                    /> 



                                    <button onClick={() => setOpenDialog(false)} className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md' >
                                        No
                                    </button>
                                </div>
                            </div>
                         </Dialog>


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

export default Usuarios;
