import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"

import 'styles/dashboard.css'

const Dashboard = () => {

    const { user } = useAuth0();

    return (
        <>
            {user ? (
                <>
                    <div className='dashboard'>
                        <div className='bienvenida'>
                            <h4 className='h4'>Bienvenido al Dashboard</h4> 
                            <h4 className='h4'>aquí podrás gestionar tus proyectos.</h4>
                        </div>
                        
                        <div className='auth'>
                            <h3>Bienvenido: {user.name}</h3> 
                        </div>
                        
                    </div>
                   
                </>
            ): (
                <>
                    <h4>Bienvenido al Dashboard, aquí podrás gestionar tus proyectos.</h4>
                </>
            )}
        </>
    )
}

export default Dashboard
