import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import {ApolloProvider, ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client";
import 'styles/globals.css';
import 'styles/tabla.css';

import Home from 'Pages/Home';
import Dashboard from 'Pages/inicio/index';
import Perfil from 'Pages/perfil/index';
import Proyectos from 'Pages/proyectos/index';
import Usuarios from 'Pages/usuarios/index';
import EditarUsuario from 'Pages/usuarios/editar';
import LayoutAdmin from 'layouts/LayoutAdmin';



const client= new ApolloClient({
  uri:'https://innova1.herokuapp.com/graphql',
  cache:new InMemoryCache(),
});

function App() {
  return (

    <ApolloProvider client={client}>
       <Auth0Provider
        domain="innova-mintic.us.auth0.com"
        clientId="4OfDznBV7xftZ5kCuQm2VNebA4mXk5Rp"
        redirectUri={'https://mysterious-hollows-06532.herokuapp.com/dashboard'}
        >
          <Router>
            <Routes>
              <Route  path='/' element={<Home/>}/>
              <Route  path='/' element={<LayoutAdmin/>}>
                <Route  path='inicio' element={<Dashboard/>}/>
                <Route  path='perfil' element={<Perfil/>}/>
                <Route  path='proyectos' element={<Proyectos/>}/>
                <Route  path='usuarios' element={<Usuarios/>}/>
                <Route  path='usuarios/editar/:_id' element={<EditarUsuario/>}/>
              </Route>
            </Routes>
          </Router>
        </Auth0Provider>
    </ApolloProvider>  
      
   
      
  );
}

export default App;
