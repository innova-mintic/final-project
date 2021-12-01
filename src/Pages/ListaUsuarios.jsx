import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useRef } from "react/cjs/react.development";
import {nanoid} from 'nanoid'

import {Dialog} from '@mui/material'
import { useState } from "react";
import { faTrashAlt , faPencilAlt,faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const ListaUsuarios = ()=>{
  const [MostrarTabla,setMostratTabla] = useState(true);
  const [vistaUsuario, setVistaUsuario] = useState(false);
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

          {MostrarTabla ? <TablaUsuarios ListaUsuarios={Usuarios} />: <VistaUsuarios />}
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
                    <th scope="col">Identificacion</th>
                    <th >Email</th>
                    <th >Tipo de usuario</th>
                    <th >Estado</th>
                    <th>Acciones</th>
                    
                      
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
        </div>
    );

    };

    const VistaUsuarios = ({Usuario}) =>{
      const [Actualizar,setActualizar] = useState(false)
      const [OpenDialog,setOpenDialog] = useState(false)
      const [infoNuevoUsuario,setinfoNuevoUsuario] = useState({
        Nombre:Usuario.Nombre,
        Identificacion:Usuario.Identificacion,
        Email:Usuario.Email,
        Tipo_Usuario:Usuario.Tipo_Usuario,
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
                      <th>{infoNuevoUsuario.Nombre} </th>
                      <td>{infoNuevoUsuario.Identificacion} </td>
                      <td>{infoNuevoUsuario.Email}</td>
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
                  <td scope="row">{Usuario.Nombre}</td>
                  <td>{Usuario.Identificacion}</td>
                  <td>{Usuario.Email}</td>
                  <td>{Usuario.Tipo_Usuario}</td>
                  <td>{Usuario.Estado}</td>
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
                      <h2>¿Seguro que desea eliminar a este usuario?</h2>
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