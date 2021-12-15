import React,{useEffect,useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hook/useFormData';
import {toast } from 'react-toastify';

import Input from 'components/Input'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import 'react-toastify/dist/ReactToastify.css';

import { Enum_EstadoProyecto , Enum_FaseProyecto } from 'utils/enums';
import { GET_PROYECTOS } from 'graphql/proyectos/queries';


const Proyectos= () => {
  const {data, error, loading}=useQuery(GET_PROYECTOS);

  console.log("los datos son",data); 

  if (loading) return <div> Cargando proyectos...</div>

  return (
    <div>
        <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Lista de Proyectos</h1>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre Proyecto</th>
              <th>Estado</th>
              <th>Fase</th>
              <th>Nombre Lider</th>
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
                      <td>{u.lider.nombre} {u.lider.apellido}</td>
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
    </div>
  )
};

export default Proyectos;
