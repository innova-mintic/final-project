import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {nanoid} from 'nanoid'
import {toast , ToastContainer} from 'react-toastify';
import {Dialog} from '@mui/material'
import { useState } from "react";
import { faTrashAlt , faPencilAlt,faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* import "styles/styles.css" */
import { Enum_Rol , Enum_EstadoUsuario } from 'utils/enums';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';


const ListaUsuarios = ()=>{
  const [MostrarTabla,setMostratTabla] = useState(true);
  const [vistaUsuario, setVistaUsuario] = useState(false);
  const {data, error, loading}=useQuery(GET_USUARIOS);
  const [Usuarios,setUsuarios] =useState([
      {Nombre:"Carlos",
      Identificacion:"1234566",
      Email:"carlos@gmail.com",
      Tipo_Usuario:"Estudiante",
      Estado:"Pendiente",
    },
    {
        Nombre:"Laura",
      Identificacion:"12549874",
      Email:"Laurita@gmail.com",
      Tipo_Usuario:"Lider",
      Estado:"Activo",
    },
    {
        Nombre:"Pedro",
      Identificacion:"126565",
      Email:"Pedrosanchez@gmail.com",
      Tipo_Usuario:"Administrador",
      Estado:"Activo",
    },
    {
        Nombre:"Erica",
      Identificacion:"1289795466",
      Email:"ericalamejor@gmail.com",
      Tipo_Usuario:"Estudiante",
      Estado:"No activo",
    },
    {
    Nombre:"Manuel",
    Identificacion:"125555",
    Email:"manuelito@gmail.com",
    Tipo_Usuario:"Estudiante",
    Estado:"Pendiente",
    },

  ]);

    
    return(
        <div>
          <h2 className= "text-center">Usuarios registrados</h2>

          {MostrarTabla ? <TablaUsuarios ListaUsuarios={data.GET_USUARIOS} />: <VistaUsuarios />}
        </div>
    )
  };

    const TablaUsuarios=({ListaUsuarios})=>{
      const [Busqueda,setBusqueda] = useState("");
      const [UsuariosFiltrados,setUsuariosFiltrados] = useState(ListaUsuarios);

      useEffect(()=>{
        setUsuariosFiltrados(
          ListaUsuarios.filter((elemento)=>{
            console.log("elemento", elemento);
            return JSON.stringify(elemento).toLowerCase().includes(Busqueda.toLowerCase());
          })
        );
    },[Busqueda,ListaUsuarios]);
    
    const form = useRef(null);
      
    
    return(
      <div>
            <input value={Busqueda} onChange={e=>setBusqueda(e.target.value)} type="text" className="input-search" placeholder="Buscar usuario..." />
            <div className="caja2">
            <div>
              
                <table  className="table">
                  <thead>
                  <tr>
                    <th >Nombre</th>
                    <th>Apellidos</th>
                    <th >Correo</th>
                    <th>Identificacion</th>
                    <th >Rol</th>
                    <th >Estado</th>
                    <th>Editar</th>
                    
                      
                  </tr>
                </thead>
                <tbody>
                  
                  
                  {UsuariosFiltrados.map((Usuario)=>{
                      
                    return(
                      
                      <VistaUsuarios key={nanoid()} Usuario = {Usuario}/>
                      
                    
                    );
                  })}
                
                
                </tbody>
                
                </table>
              
              
            </div>
              
          </div>
          <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={true}
            />
        </div>
    );

    };

    const VistaUsuarios = ({Usuario}) =>{
      const [Actualizar,setActualizar] = useState(false)
      const [OpenDialog,setOpenDialog] = useState(false)
      const [infoNuevoUsuario,setinfoNuevoUsuario] = useState({
        nombre:Usuario.nombre,
        apellidos:Usuario.apellido,
        correo:Usuario.correo,
        identificacion:Usuario.identificacion,
        Enum_Rol:Usuario.Tipo_Usuario,
        Estado:Usuario.Estado
      })

      const actualizarUsuario= async ()=>{
        setActualizar(!Actualizar)
        console.log(infoNuevoUsuario)
        //enviar la actualizacion al backend con la variable infoNuevoUsuario
       };
      const eliminarUsuario = async ()=>{
        //Eliminar al usuario
      setOpenDialog(false);
    };
    
        return(
          <tr>
                {Actualizar?
                  <>
                      <th>{infoNuevoUsuario.nombre} </th>
                      <th>{infoNuevoUsuario.apellido} </th>
                      <td>{infoNuevoUsuario.correo}</td>
                      <td>{infoNuevoUsuario.identificacion} </td>
                      <td><select name="Tipo_Usuario" value={infoNuevoUsuario.Tipo_Usuario}
                      onChange={e=>setinfoNuevoUsuario({...infoNuevoUsuario,Tipo_Usuario:e.target.value})}
                      className="form-select">
                      <option disabled value={0}>...</option>
                      <option>Estudiante</option>
                      <option>Lider</option>
                      <option>Administrador</option>
                      </select></td>
                      <td><select name="Estado" value={infoNuevoUsuario.Estado}
                      onChange={e=>setinfoNuevoUsuario({...infoNuevoUsuario,Estado:e.target.value})}
                      className="form-select">
                      <option disabled value={0}>...</option>
                      <option>Pendiente</option>
                      <option>Activo</option>
                      <option>No activo</option>
                      </select></td>
                      
                  </>
                  :

                  <>
                  <td>{Usuario.nombre}</td>
                  <td>{Usuario.apellido}</td>
                  <td>{Usuario.correo}</td>
                  <td>{Usuario.identificacion}</td>
                  <td>{Enum_Rol[Usuario.rol]}</td>
                  <td>{Enum_EstadoUsuario[Usuario.estado]}</td>
                  </>
                }
                <td>
                  <div>
                  
                  {Actualizar?(
                  <>
                  <div className = "iconoActualizar">
                    <FontAwesomeIcon onClick={()=> actualizarUsuario()} icon={faCheck}/>
                    </div>
                    <div className = "iconos">
                    <FontAwesomeIcon onClick={()=> setActualizar(!Actualizar)} icon={faTimes}/>
                    </div>
                  </>
                  ):(
                  <>
                  <div className = "iconoActualizar">
                    <FontAwesomeIcon icon={faPencilAlt} onClick={()=> setActualizar(!Actualizar)}/>
                    </div>
                    <div className = "iconos">
                    <FontAwesomeIcon icon={faTrashAlt} onClick = {()=>setOpenDialog(true)} />
                    </div>
                  
                    
                  </>
                  )}
                 
                  
                  

                  </div>
                  <Dialog open={OpenDialog}>
                    <div style={{backgroundColor : "rgb(171,202,192)"}}>
                      <h2>??Seguro que desea eliminar a este usuario?</h2>
                      <div style={{backgroundColor:"rgb(171,202,192", textAlign:"center"}}>
                        <button onClick={()=> eliminarUsuario()} className="btn2 btn-primary3">Si</button>
                        <button onClick={()=>setOpenDialog(false)} className="btn2 btn-primary3">No</button>
                      </div>
                      
                    </div>
                  </Dialog>
                </td>
                
              </tr>
        )
    
    
    };

export default ListaUsuarios;