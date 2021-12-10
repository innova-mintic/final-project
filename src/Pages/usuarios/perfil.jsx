import React,{useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hook/useFormData';
import {toast } from 'react-toastify';

import Input from 'components/Input'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';

import { GET_USUARIO } from 'graphql/usuarios/queries';
import { EDITAR_PERFIL} from 'graphql/perfil/mutations';

const EditarPerfil= () => {

    const{form, formData,updateFormData} = useFormData(null);

    const _id='61ae26807de7e64c94128677'

    const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_USUARIO,{
        variables:{_id}
    });


    const [editarPerfil, {data:mutationDataPerfil, loading:mutationLoadingPerfil, error:mutationErrorPerfil}] = useMutation(EDITAR_PERFIL);

    const submitForm = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        editarPerfil({
            variables:{_id,...formData}
        })
    };

    useEffect(()=>{
        if (mutationDataPerfil){
            toast.success('Perfil modificado con exito',{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
            });
        }
    }, [mutationDataPerfil])

    
    useEffect(()=>{
        if (mutationErrorPerfil){
          toast.error("Error al editar el usuario");
        }
        if (queryError){
        toast.error("Error al consultar el usuario");
        }
      },[queryError,mutationErrorPerfil]);



    if (queryLoading) return <div> Cargando ...</div>

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Perfil</h1>
        <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form} 
                className='flex flex-col items-center justify-center'
        >
            <Input
                label='Nombre:'
                type='text'
                name='nombre'
                defaultValue={queryData.Usuario.nombre}
                required={true}
                disabled={false}
            />
            <Input
                label='Apellido:'
                type='text'
                name='apellido'
                defaultValue={queryData.Usuario.apellido}
                required={true}
                disabled={false}
            />
            <Input
                label='Identificacion:'
                type='text'
                name='identificacion'
                defaultValue={queryData.Usuario.identificacion}
                required={true}
                disabled={false}
            />
            <Input
                label='Correo:'
                type='email'
                name='correo'
                defaultValue={queryData.Usuario.correo}
                required={true}
                disabled={false}
            />

             <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoadingPerfil}
                    text='Confirmar'
            /> 




        </form>
        
  </div>
)
};

export default EditarPerfil;
