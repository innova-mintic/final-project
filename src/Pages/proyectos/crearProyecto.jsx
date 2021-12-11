import React,{useEffect,useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hook/useFormData';
import {toast} from 'react-toastify';
import { nanoid } from 'nanoid';

import Input from 'components/Input'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';

import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import { GET_USUARIO } from 'graphql/usuarios/queries';

import { Enum_FaseProyecto } from 'utils/enums';
import { Enum_EstadoProyecto } from 'utils/enums';
import { Enum_TipoObjetivo } from 'utils/enums';


import PrivateComponent from 'components/PrivateComponent';

import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';

const CrearProyecto= () => {

    const{form, formData,updateFormData} = useFormData(null);

    const _id='61ae26807de7e64c94128677'

    const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_USUARIO,{
        variables:{_id}
    });

    const [crearProyecto, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(CREAR_PROYECTO);

    const submitForm = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        formData.lider=_id;
        formData.objetivos = Object.values(formData.objetivos);

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
    
    if (queryLoading) return <div> Cargando ...</div>

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
                        <span className='uppercase'>Lider del proyecto: {queryData.Usuario.nombre + ' ' + queryData.Usuario.apellido}</span>
                        <Input
                            label='Nombre del proyecto:'
                            type='text'
                            name='nombre'
                            defaultValue={''}
                            required={true}
                            disabled={false}
                        />
                        <Input
                            label='Presupuesto:'
                            type='text'
                            name='presupuesto'
                            defaultValue={''}
                            required={true}
                            disabled={false}
                        />
                        <Input
                            label='Fecha de inicio:'
                            type='date'
                            name='fechaInicio'
                            defaultValue={''}
                            required={true}
                            disabled={false}
                        />
                        <Objetivos />
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


const Objetivos=()=>{
    const [listaObjetivos ,setListaObjetivos]=useState([]);

    const eliminarObjetivo =(id)=>{
        setListaObjetivos(listaObjetivos.filter(el=>el.props.id !== id));
    }


    const componenteObjetivoAgregado =()=>{
        const id =nanoid();
        return <FormObjetivo key={id} id={id} />
        
    }
    return (
        <ObjContext.Provider value={{eliminarObjetivo}}>
            <div>
                <span> Objetivos del proyecto</span>
                <i
                    onClick={()=>setListaObjetivos([...listaObjetivos,componenteObjetivoAgregado()])}
                    className='fas fa-plus rounded-full bg-green-500 hover:bg-green-400 text-white p-2 mx-2 cursor-pointer'
                />
                {listaObjetivos.map(objetivo=>{
                    return objetivo;
                })}
            </div>
        </ObjContext.Provider>
    );
}


const FormObjetivo=({id})=>{
    const {eliminarObjetivo} =useObj();

    return(
        <div className='flex items-center'>
            <Input 
                name={`nested||objetivos||${id}||descripcion`}  
                label='Descripcion' 
                type='text' 
                required={true} 
                />
            <DropDown 
                name={`nested||objetivos||${id}||tipo`}
                options={Enum_TipoObjetivo} 
                label='Tipo de Objetivo' 
                required={true} 
            />
            <i onClick={()=>eliminarObjetivo(id)} className='fas fa-minus rounded-full bg-red-500 hover:bg-red-400 text-white p-2 mx-2 cursor-pointer mt-6' />
        </div>
    )
}


export default CrearProyecto;
