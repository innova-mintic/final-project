import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link
 } from 'react-router-dom';
const Home = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <>
        
            <Link to="inicio">
                <button type="button" className='w-full bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white text my-2 ml-4'>
                    Iniciar sesion
                </button>
            </Link>

        </>
    )
}

export default Home;
