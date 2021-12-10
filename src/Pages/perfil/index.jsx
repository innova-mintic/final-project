import React from 'react'
import Input from 'components/Input'
import PrivateComponent from 'components/PrivateComponent';


const Perfil= () => {

  return (
    <>
    <PrivateComponent roleList={['lider']}>
      <div className='flew flex-col w-full h-full items-center justify-center p-10'>
        <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>Editar Perfil</h1>
        <form
            className='flex flex-col  items-center justify-center'
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
                name='identificacion '
                defaultValue={''}
                required={true}
            />
            <Input
                label='Fecha de nacimiento:'
                type='date'
                name='telefono'
                defaultValue={''}
                required={true}
            />


        </form>
        
    </div>  
    </PrivateComponent>
    
    </>
    
)
};

export default Perfil;
