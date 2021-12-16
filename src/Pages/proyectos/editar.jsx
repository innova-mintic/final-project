import React,{useEffect,useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hook/useFormData';
import {toast } from 'react-toastify';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import Input from 'components/Input'
import ButtonLoading from 'components/ButtonLoading';
import DropDown from 'components/Dropdown';

import { Enum_EstadoProyecto , Enum_FaseProyecto} from 'utils/enums';
import { GET_PROYECTO } from 'graphql/proyectos/queries';
import {APROBAR_PROYECTO} from 'graphql/proyectos/mutations';
import { CREAR_INSCRIPCION } from 'graphql/inscripcion/mutations';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import {EDITAR_PROYECTO} from 'graphql/proyectos/mutations';
import PrivateComponent from 'components/PrivateComponent';
import { GET_AVANCES } from 'graphql/proyectos/queries';

function EditarProyecto() {

    const{form, formData,updateFormData} = useFormData(null);
    
    const {_id}=useParams();

    const{data:queryDataProyecto,error:queryErrorProyecto,loading:queryLoadingProyecto}=useQuery(GET_PROYECTO,{variables:{_id} } );

    const [editarProyecto, {data:mutationData, loading:mutationLoading, error:mutationError}] = useMutation(APROBAR_PROYECTO);

    const submitForm = (e)=>{
        e.preventDefault() 
        console.log("los datos son:",formData)
        editarProyecto({ variables:{_id,...formData} } )    
    };

    useEffect(()=>{
        if (mutationData){
            toast.success('Proyecto modificado con exito', {position: "top-right", autoClose: 2000, hideProgressBar: true,closeOnClick: true});
        }
    }, [mutationData])

    useEffect(()=>{
        if (mutationError){
          toast.error("Error al editar el proyecto");
        }
        if (queryErrorProyecto){
        toast.error("Error al consultar el proyecto");
        }
      },[queryErrorProyecto,mutationError]);
    

    if (queryLoadingProyecto) return <div> Cargando...</div>

    
    /* console.log('los avances son:',queryDataAvances.buscarAvances.map( (u)=> u.descripcion ) ) */
      console.log('el id es:',queryDataProyecto.Proyecto._id)
    /* console.log('los avances con el otro query son:',queryDataProyecto.Proyecto.avances.map( (u)=> u.descripcion ) ) */

    if (queryDataProyecto.Proyecto) {
    return (
        <div className='flew flex-col w-full h-full items-center justify-center p-10'>
            <Link to='/proyectos'>
                <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
            </Link>
            <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Informacion del Proyecto</h1>
            <form
                onSubmit={submitForm}
                onChange={updateFormData}
                ref={form} 
                className='flex flex-col items-center justify-center'
            >     
                    <span className='uppercase'>Lider del proyecto: {queryDataProyecto.Proyecto.lider.nombre+ ' ' + queryDataProyecto.Proyecto.lider.apellido}</span>
                    <Input
                        label='Nombre del proyecto:'
                        type='text'
                        name='nombre'
                        defaultValue={queryDataProyecto.Proyecto.nombre}
                        required={true}
                        className='input widthInput'
                    />
 
                    <Input
                        label='Presupuesto del proyecto:'
                        type='string'
                        name='presupuesto'
                        defaultValue={queryDataProyecto.Proyecto.presupuesto}
                        required={true}
                    />
                    <Input
                        label='Fecha Inicio:'
                        type='text'
                        name='fechaInicio'
                        defaultValue={queryDataProyecto.Proyecto.fechaInicio.slice(0,-14)}
                        required={true}
                        disabled={true}
                    />
                    <Input
                        label='Fecha Fin:'
                        type='text'
                        name='fechaFin'
                        defaultValue={queryDataProyecto.Proyecto.fechaFin}
                        required={true}
                        disabled={true}
                    />
                    <Input
                        label='Objetivo General:'
                        type='text'
                        name='objetivoGeneral'
                        defaultValue={queryDataProyecto.Proyecto.objetivoGeneral}
                        required={true}
                        className='input widthInput'
                    />
                     <VerObjetivosEspecificos

                        objetivos={queryDataProyecto.Proyecto.objetivosEspecificos}
                    />
                    <VerAvancesProyecto 
                        avances={queryDataProyecto.Proyecto.avances}
                    />
                    <DropDown
                        label='Estado del proyecto:'
                        name='estado'
                        defaultValue={queryDataProyecto.Proyecto.estado}
                        required={true}
                        options={Enum_EstadoProyecto}
                        disabled={true}
                    />
                    <DropDown
                        label='Fase del proyecto:'
                        name='fase'
                        defaultValue={queryDataProyecto.Proyecto.fase}
                        required={true}
                        options={Enum_FaseProyecto}
                        disabled={true}
                    />
                    <ButtonLoading
                        disabled={Object.keys(formData).length === 0}
                        loading={mutationLoading}
                        text='Confirmar'
                    /> 
            </form>
            <InscricpionProyecto
                idProyecto={queryDataProyecto.Proyecto._id}
                estado={queryDataProyecto.Proyecto.estado}
                inscripciones={queryDataProyecto.Proyecto.inscripciones}
              />
        </div>
     )};
    return <></>;
};

const VerObjetivosEspecificos= ({objetivos})=>{
    return(
        <>                    
            <Accordion className='mt-3'>
                <AccordionSummary>Ver objetivos especificos</AccordionSummary>
                    {objetivos.map( (u)=>{
                            return (<AccordionDetails> {u.descripcion}</AccordionDetails>)
                    })}
            </Accordion>                 
        </>
    );
}

const VerAvancesProyecto= ({avances})=>{
    return(
        <>                    
            <Accordion className='mt-3'>
                <AccordionSummary>Ver avances</AccordionSummary>
                    {avances.map( (u)=>{
                            return (<AccordionDetails> {u.descripcion}</AccordionDetails>)
                    })}
            </Accordion>                 
        </>
    );
}



const InscricpionProyecto= ({ idProyecto,estado, inscripciones }) => {

    const [estadoInscripcion, setEstadoInscripcion] = useState('');
    
    const [crearInscripcion, {data:mutationDataInscripcion, loading:mutationLoadingInscripcion, error:mutationErrorInscripcion}] = useMutation(CREAR_INSCRIPCION);

    const _idUsuario='61b940251ff3c450b7b85a8f'

    /* const{data:queryDataUsuario,error:queryErrorUsuario,loading:queryLoadingUsuario}=useQuery(GET_USUARIO,{variables:{_id:_idUsuario} } );  */

    useEffect(() => {
        if (inscripciones) {
            const flt = inscripciones.filter((el) => el.estudiante._id === _idUsuario);
            console.log('filt:',inscripciones.map( (u)=> u.estudiante._id));
            console.log('filt:',flt)
            if (flt.length > 0) {
            setEstadoInscripcion(flt[0].estado);
            }
        }
        }, [inscripciones]);

    const confirmarInscripcion=()=>{
        crearInscripcion({variables:{estudiante:_idUsuario, proyecto: idProyecto}})  
    }

    useEffect(()=>{
        if (mutationDataInscripcion){
            toast.success('Inscripcion realizada con exito', {position: "top-right",autoClose: 2000,hideProgressBar: true,closeOnClick: true});
        }
    }, [mutationDataInscripcion])    
    
    /* if (queryLoadingUsuario) return <div> Cargando...</div> */

    return(
        <>
            {estadoInscripcion !=='' ? (<span className='flex flex-col items-center justify-center'>Ya estas inscrito en este proyecto y el estado es {estadoInscripcion} </span>
            ):(
                <div onClick={()=>confirmarInscripcion()} className='flex flex-col items-center justify-center' >
                    <ButtonLoading
                                disabled={estado==='INACTIVO'}
                                loading={mutationLoadingInscripcion}
                                text='Inscribirme'
                            /> 
                </div>
                ) 
            }           
        </>
    );
};



export default EditarProyecto;
