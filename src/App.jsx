import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import {ApolloProvider, ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client";
import 'styles/globals.css';
import 'styles/tabla.css';
/* import 'styles/styles.css'; */

import PrivateRoute from 'components/PrivateRoute';

import LayoutAdmin from 'layouts/LayoutAdmin';
import Home from 'Pages/Home';
import Dashboard from 'Pages/inicio/index';

import CrearUsuario from 'Pages/usuarios/crearUsuario';
import EditarPerfil from 'Pages/usuarios/perfil';
import Usuarios from 'Pages/usuarios/index';
import EditarUsuario from 'Pages/usuarios/editar';
import ListaUsuarios from 'Pages/ListaUsuarios';

import Proyectos from 'Pages/proyectos/index';
import MisProyectos from 'Pages/proyectos/misProyectos';
import CrearProyecto from 'Pages/proyectos/crearProyecto';
import EditarProyecto from 'Pages/proyectos/editar';
import Solicitudes from 'Pages/proyectos/solicitudes';


/* const client= new ApolloClient({
  uri:'https://innova1.herokuapp.com/graphql',
  cache:new InMemoryCache(),
});  */

 const client= new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache(),
}); 

function App() {
  return (

    <ApolloProvider client={client}>
       <Auth0Provider
          domain="innova-mintic.us.auth0.com"
          clientId="4OfDznBV7xftZ5kCuQm2VNebA4mXk5Rp"
          redirectUri={'http://localhost:3000/inicio'}
          audience='innova-mintic-api'
        >
            <Router>
                <Routes>
                      <Route  path='/' element={<Home/>}/>
                      <Route  path='/' element={<LayoutAdmin/>}>
                        <Route  path='/inicio' element={<Dashboard/>}/>

                        <Route  path='/crearUsuario' element={<CrearUsuario/>}/>
                        <Route  path='/perfil' element={<EditarPerfil/>}/>
                        <Route  path='/usuarios' element={<Usuarios/>}/>
                        <Route  path='/usuarios/editar/:_id' element={<EditarUsuario/>}/>
                        <Route  path='/usuarios2' element={<ListaUsuarios/>}/>

                        <Route  path='/proyectos' element={<Proyectos/>}/>
                        <Route  path='/proyectos/editar/:_id' element={<EditarProyecto/>}/>
                        <Route  path='/misProyectos' element={<MisProyectos/>}/>
                        <Route  path='/crearProyecto' element={<CrearProyecto/>}/>
                        <Route  path='/solicitudes' element={<Solicitudes/>}/>        
                      </Route>
              </Routes>
          </Router>
        </Auth0Provider>
    </ApolloProvider>  
      
   
      
  );
}

export default App;
