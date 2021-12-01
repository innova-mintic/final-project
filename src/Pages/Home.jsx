import React from 'react';
import Navbar from 'components/NavBar';
import 'styles/home.css';
import Footer from 'components/Footer';

 const Home = () => {

    return (
        <div className="background">
            <Navbar />
            <div className="intro">
                <div className="description">
                    Disfruta este gestor de proyectos, registra tu equipo y comienza a administrarlo.
                    <h3 className="h3main">¡Que esperas!</h3>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
