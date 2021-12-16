import React,{useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hook/useFormData';
import {toast } from 'react-toastify';

import Input from 'components/Input'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';

import { Enum_Rol , Enum_EstadoUsuario } from 'utils/enums';
import { CREAR_USUARIO } from 'graphql/usuarios/mutations';
import PrivateComponent from 'components/PrivateComponent'

const CrearUsuario= () => {

    const{form, formData,updateFormData} = useFormData(null);
    const {_id}=useParams();

    const [crearUsuario, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(CREAR_USUARIO);

    const submitForm = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        crearUsuario({
            variables:{_id,...formData}
        })
    };

    useEffect(()=>{
        if (mutationData){
            toast.success('Proyecto creado con exito',{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
            });
        }
    }, [mutationData])


    return (
        <>
            <div className='flew flex-col w-full h-full items-center justify-center p-10'>
                <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Creacion de usuario</h1>
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
                        defaultValue={''}
                        required={true}
                    />
                    <Input
                        label='Apellido:'
                        type='text'
                        name='apellido'
                        defaultValue={''}
                        required={true}
                    />
                    <Input
                        label='Identificacion:'
                        type='text'
                        name='identificacion'
                        defaultValue={''}
                        required={true}
                    />
                    <Input
                        label='Correo:'
                        type='email'
                        name='correo'
                        defaultValue={''}
                        required={true}
                    />

                <DropDown
                    label='Rol:'
                    name='rol'
                    defaultValue={''}
                    required={true}
                    options={Enum_Rol}
                />

                <ButtonLoading
                    disabled={''}
                    loading={mutationLoading}
                    text='Crear Usuario'
                /> 

                </form>
                
            </div>
            
            
        </>
        
    )
    };

export default CrearUsuario;
