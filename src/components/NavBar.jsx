import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

import 'styles/navbar.css';

const Navbar = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <>
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark pt-2 pb-5">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Navbar 
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item border2">
                                <div className="login">
                                    <button className="btn btn-outline-primary" onClick={() => loginWithRedirect()}><i class="fa-solid fa-arrow-right-to-bracket"></i>Log In</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        </>
    )
}

export default Navbar