import React,{useEffect,useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hook/useFormData';
import {toast } from 'react-toastify';

import Input from 'components/Input'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';

import 'react-toastify/dist/ReactToastify.css';
import { Tooltip, Dialog } from '@material-ui/core';

import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { GET_ESTUDIANTES } from 'graphql/usuarios/queries';
import { Enum_Rol , Enum_EstadoUsuario } from 'utils/enums';



const Usuarios= () => {

  const {data, error, loading}=useQuery(GET_USUARIOS);

  const {data:dataEstudiantes, error:errorEstudiantes, loading:loadingEstudiantes}=useQuery(GET_ESTUDIANTES,{ variables:{rol:'ESTUDIANTE'}});

  if (loading) return <div> Cargando usuarios...</div>
  if (loadingEstudiantes) return <div> Cargando estudiantes...</div>

  console.log("los datos son", data); 
  console.log("los datos son", dataEstudiantes); 

  return (
    <div>
        <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Lista de Usuarios</h1>
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



                        </div>


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
