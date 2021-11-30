import React,{useEffect} from 'react'
import Input from 'components/Input'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hook/useFormData';

function EditarUsuario() {
    const{form, formData,updateFormData} = useFormData(null);
    const {_id}=useParams();

    const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_USUARIO,{
        variables:{_id}
    });

    const [editarUsuario, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(EDITAR_USUARIO);

    
    
    const submitForm = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        editarUsuario({
            variables:{_id,...formData,rol:'ADMINISTRADOR'}
        })
    };
    
    useEffect(()=>{
        console.log('mutacion edicion',mutationData);
    }, [mutationData])
    
    
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
                />
                <Input
                    label='Apellido de la persona:'
                    type='text'
                    name='apellido'
                    defaultValue={queryData.Usuario.apellido}
                    required={true}
                />
                <Input
                    label='Correo de la persona:'
                    type='email'
                    name='correo'
                    defaultValue={queryData.Usuario.correo}
                    required={true}
                />
                <Input
                    label='Identificación de la persona:'
                    type='text'
                    name='identificacion'
                    defaultValue={queryData.Usuario.identificacion}
                    required={true}
                />
{/*                 <DropDown
                    label='Estado de la persona:'
                    name='estado'
                    defaultValue={queryData.Usuario.estado}
                    required={true}
                    options={Enum_EstadoUsuario}
                /> */}
                 {/* <span>Rol del usuario: {queryData.Usuario.rol}</span> */}
                <ButtonLoading
                    disabled={false}
                    loading={false}
                    text='Confirmar'
                /> 
            </form>
      </div>
    )
}

export default EditarUsuario;
