import React,{useEffect} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hook/useFormData';
import {toast } from 'react-toastify';

import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';

import { Enum_EstadoInscripcion } from 'utils/enums';
import { GET_INSCRIPCION } from 'graphql/inscripcion/queries';
import { GET_INSCRIPCIONES } from 'graphql/inscripcion/queries';
import { APROBAR_INSCRIPCION } from 'graphql/inscripcion/mutations';



function EditarInscripcion() {

    const navigate  = useNavigate();

    const{form, formData,updateFormData} = useFormData(null);

    const {_id}=useParams();

    const{data:queryDataInscripcion,error:queryErrorInscripcion,loading:queryLoadingInscripcion}=useQuery(GET_INSCRIPCION,{variables:{_id}});
    
    const [aprobarInscripcion, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(APROBAR_INSCRIPCION,
        {refetchQueries:[{query:GET_INSCRIPCIONES},{query:GET_INSCRIPCION} ] } );

    const submitForm = (e)=>{
        e.preventDefault(); 
        console.log("fg",formData)
        aprobarInscripcion({
            variables:{_id,...formData}
        })
    };
    
    useEffect(()=>{
        if (mutationData){
            toast.success('Inscripcion aprobada con exito',{position: "top-right",autoClose: 2000,hideProgressBar: true,closeOnClick: true,});
        }
    }, [mutationData])

    
    if (queryLoadingInscripcion) return <div> Cargando...</div>
    

    const inscripcion= queryDataInscripcion.FiltrarInscripcion.estudiante

    return (
        <div className='p-10'>

            <button onClick={() => navigate(-1)}>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </button>

            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Informacion del Estudiante</h1>
        
            <div className='flex flex-col p-10 items-center m-2 '>
                <span className='uppercase  text-blue-600'>  Nombre:{' '+inscripcion.nombre} {inscripcion.apellido}  </span>
                <span className='uppercase  text-blue-600'>  Correo: {' '+inscripcion.correo}  </span>
            </div>

            <h1 className='m-4 text-lg text-gray-800 font-bold text-center'>Proyectos donde participa el estudiante:</h1>
            <table className='tabla tabla2' >
                <thead>
                <tr>
                    <th>Proyecto</th>
                    <th>Estado</th>
                </tr>
                </thead>
                <tbody>
                 {inscripcion.inscripciones.map((u) => {
                    return (
                        <tr key={u._id}>
                             <td>{u.proyecto.nombre}</td>
                             <td>{u.estado}</td>
                        </tr>
                    )
                 })}
                </tbody>
            </table>

            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form} 
                className='flex flex-col items-center justify-center'
            >  

                <DropDown
                    label='Estado Inscripcion:'
                    name='estado'
                    defaultValue={queryDataInscripcion.FiltrarInscripcion.estado}
                    required={true}
                    options={Enum_EstadoInscripcion}
                    disabled={true}
                />
                <ButtonLoading
                    disabled={Object.keys(formData).length === 0}
                    loading={mutationLoading}
                    text='Confirmar'
                /> 
            </form>

      </div>
    )
}

export default EditarInscripcion;
