import React,{useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hook/useFormData';
import {toast } from 'react-toastify';

import Input from 'components/Input'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';

import { GET_USUARIO } from 'graphql/usuarios/queries';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { EDITAR_USUARIO, ELIMINAR_USUARIO } from 'graphql/usuarios/mutations';
import { Enum_EstadoUsuario } from 'utils/enums';

function EditarUsuario() {
    const{form, formData,updateFormData} = useFormData(null);

    const {_id}=useParams();

    const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_USUARIO,{ variables:{_id}});
    
    console.log("el id es",_id); 
    console.log("los datos son",queryData); 

    const [editarUsuario, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(EDITAR_USUARIO,
        {refetchQueries:[{query:GET_USUARIOS} ] } );

    const submitForm = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        delete formData.rol;
        editarUsuario({
            variables:{_id,...formData}
        })
        window.location="/usuarios";
    };
    
    useEffect(()=>{
        if (mutationData){
            toast.success('Usuario modificado con exito',{position: "top-right",autoClose: 2000, hideProgressBar: true,closeOnClick: true,});
        }
    }, [mutationData])

    useEffect(()=>{
        if (mutationError){
          toast.error("Error al editar el usuario");
        }
        if (queryError){
        toast.error("Error al consultar el usuario");
        }
      },[queryError,mutationError]);
    
    if (queryLoading) return <div> Cargando...</div>

    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/usuarios'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Usuario</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form} 
                className='flex flex-col items-center justify-center'
            >
                <Input
                    label='Nombre de la persona:'
                    type='text'
                    name='nombre'
                    defaultValue={queryData.Usuario.nombre}
                    required={true}
                    disabled={true}
                />
                <Input
                    label='Apellido de la persona:'
                    type='text'
                    name='apellido'
                    defaultValue={queryData.Usuario.apellido}
                    required={true}
                    disabled={true}
                />
                <Input
                    label='Correo de la persona:'
                    type='email'
                    name='correo'
                    defaultValue={queryData.Usuario.correo}
                    required={true}
                    disabled={true}
                />
                <Input
                    label='Identificaci??n de la persona:'
                    type='text'
                    name='identificacion'
                    defaultValue={queryData.Usuario.identificacion}
                    required={true}
                    disabled={true}
                />
                <DropDown
                    label='Estado de la persona:'
                    name='estado'
                    defaultValue={queryData.Usuario.estado}
                    required={true}
                    options={Enum_EstadoUsuario}
                />
                 <span>Rol del usuario: {queryData.Usuario.rol}</span>
                <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                    
                /> 
            </form>
      </div>
    )
}

export default EditarUsuario;
