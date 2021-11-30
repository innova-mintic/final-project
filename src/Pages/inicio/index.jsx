import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {

    const { logout } = useAuth0();
    
    const cerrarSesion = () => {
        logout({ returnTo: window.location.origin });
        localStorage.setItem('token', null);
    }

    return (
        <div>
            <button className="btn btn-outline-primary" onClick={() => cerrarSesion()}>
                Log Out
            </button>
            este es el dashboard
        </div>
    )
}

export default Dashboard
