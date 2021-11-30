import React from 'react';
import Navbar from 'components/NavBar';
import 'styles/home.css';

 const Home = () => {

    return (
        <div className="background">
            <Navbar />
            <div className="intro">
                inscribe tus proyectos
            </div>
        </div>
    )
}

export default Home;
