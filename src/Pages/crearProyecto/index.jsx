import React,{useEffect} from 'react'
import Input from 'components/Input'
import { Enum_Rol , Enum_EstadoUsuario } from 'utils/enums';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import { useQuery, useMutation } from '@apollo/client';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import useFormData from 'hook/useFormData';
import {useParams, Link} from 'react-router-dom'
import { Enum_FaseProyecto } from 'utils/enums';
import { Enum_EstadoProyecto } from 'utils/enums';
import {toast } from 'react-toastify';
import PrivateComponent from 'components/PrivateComponent';

const CreacionProyecto= () => {

    const{form, formData,updateFormData} = useFormData(null);

    const _id='619e7781082598103644488e'

    const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_USUARIO,{
        variables:{_id}
    });

    console.log("el id es",_id); 
    console.log("los datos son",queryData); 

    const [crearProyecto, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(CREAR_PROYECTO);

    const submitForm = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        formData.lider=_id;

        console.log("fg2",formData)
        crearProyecto({
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
        <PrivateComponent roleList={['rol']}>
            <div className='flew flex-col w-full h-full items-center justify-center p-10'>
                        <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Creacion de Proyecto</h1>
                        <form
                            onSubmit={submitForm}
                            onChange={updateFormData}
                            ref={form} 
                            className='flex flex-col items-center justify-center'
                        >

                            {/* <span className='uppercase'>Lider del proyecto: {queryData.Usuario.nombre + ' ' + queryData.Usuario.apellido}</span> */}
                            <Input
                                label='Nombre del proyecto:'
                                type='text'
                                name='nombre'
                                defaultValue={''}
                                required={true}
                            />
                            <Input
                                label='Presupuesto:'
                                type='text'
                                name='presupuesto'
                                defaultValue={''}
                                required={true}
                            />
                            <Input
                                label='Fecha de inicio:'
                                type='date'
                                name='fechaInicio'
                                defaultValue={''}
                                required={true}
                            />

                            <DropDown
                                label='Estado:'
                                name='estado'
                                defaultValue={''}
                                required={true}
                                options={Enum_EstadoProyecto}
                            />
                            <DropDown
                                label='Fase:'
                                name='fase'
                                defaultValue={''}
                                required={true}
                                options={Enum_FaseProyecto}
                            />        
                            <ButtonLoading
                                disabled={''}
                                loading={mutationLoading}
                                text='Crear Proyecto'
                            /> 

                        </form>
                        
                    </div>
        </PrivateComponent>
        </>
        
    )
    };

export default CreacionProyecto;
