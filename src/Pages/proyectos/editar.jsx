import React,{useEffect} from 'react'
import Input from 'components/Input'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hook/useFormData';
import {toast } from 'react-toastify';
import DropDown from 'components/Dropdown';
import { Enum_EstadoProyecto , Enum_FaseProyecto} from 'utils/enums';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import {EDITAR_PROYECTO} from 'graphql/proyectos/mutations';
import PrivateComponent from 'components/PrivateComponent';

function EditarProyecto() {
    const{form, formData,updateFormData} = useFormData(null);

    const {_id}=useParams();

    const{data:queryData,error:queryError,loading:queryLoading}=useQuery(GET_PROYECTO,{
        variables:{_id}
    });

    const [editarProyecto, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(EDITAR_PROYECTO);

    const submitForm = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        editarProyecto({
            variables:{_id,...formData}
        })
    };
    
    useEffect(()=>{
        if (mutationData){
            toast.success('Proyecto modificado con exito', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
            });
        }
    }, [mutationData])

    useEffect(()=>{
        if (mutationError){
          toast.error("Error al editar el proyecto");
        }
        if (queryError){
        toast.error("Error al consultar el proyecto");
        }
      },[queryError,mutationError]);
    
    if (queryLoading) return <div> Cargando...</div>

    return (
        <>
        <PrivateComponent roleList={['rol']}>
            <div className='flew flex-col w-full h-full items-center justify-center p-10'>
                <Link to='/proyectos'>
                    <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
                </Link>
                <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Proyecto</h1>
                <form
                    onSubmit={submitForm}
                    onChange={updateFormData}
                    ref={form} 
                    className='flex flex-col items-center justify-center'
                >
                    <Input
                        label='Nombre del proyecto:'
                        type='text'
                        name='nombre'
                        defaultValue={queryData.Proyecto.nombre}
                        required={true}
                    />
                    <Input
                        label='Nombre del lider:'
                        type='text'
                        name='nombre lider'
                        defaultValue={queryData.Proyecto.lider.nombre}
                        required={true}
                    />
                    <Input
                        label='Apellido del lider:'
                        type='text'
                        name='apellido lider'
                        defaultValue={queryData.Proyecto.lider.apellido}
                        required={true}
                    />
                    <Input
                        label='Presupuesto del proyecto:'
                        type='string'
                        name='presupuesto'
                        defaultValue={queryData.Proyecto.presupuesto}
                        required={true}
                    />
                    <DropDown
                        label='Estado del proyecto:'
                        name='estado'
                        defaultValue={queryData.Proyecto.estado}
                        required={true}
                        options={Enum_EstadoProyecto}
                    />
                    <DropDown
                        label='Fase del proyecto:'
                        name='fase'
                        defaultValue={queryData.Proyecto.fase}
                        required={true}
                        options={Enum_FaseProyecto}
                    />
                    <Input
                        label='Fecha Inicio:'
                        type='text'
                        name='fechaInicio'
                        defaultValue={queryData.Proyecto.fechaInicio}
                        required={true}
                    />
                    <Input
                        label='Fecha Fin:'
                        type='text'
                        name='fechaFin'
                        defaultValue={queryData.Proyecto.fechaFin}
                        required={true}
                    />
                
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={mutationLoading}
                        text='Confirmar'
                    /> 
                </form>
            </div>
        </PrivateComponent>
            
        </>
    )
}

export default EditarProyecto;
