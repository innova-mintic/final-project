import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import {ApolloProvider, ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client";
import 'styles/globals.css';
import 'styles/tabla.css';
/* import 'styles/styles.css';  no esta funcionando  */

import Home from 'Pages/Home';
import Dashboard from 'Pages/inicio/index';
import Perfil from 'Pages/perfil/index';
import Proyectos from 'Pages/proyectos/index';
import Usuarios from 'Pages/usuarios/index';
import EditarUsuario from 'Pages/usuarios/editar';
import LayoutAdmin from 'layouts/LayoutAdmin';
import ListaUsuariosC4 from 'Pages/ListaUsuarios';


const client= new ApolloClient({
  uri:'https://innova1.herokuapp.com/graphql',
  cache:new InMemoryCache(),
});

function App() {
  return (

    <ApolloProvider client={client}>
       <Auth0Provider
        domain="dev-6v2sbo5u.us.auth0.com"
        clientId="aaMuAlzmMFWPgr8COfZ3ucjEqFY2QeS9"
        redirectUri={'http://localhost:3000/inicio'}
        >
          <Router>
            <Routes>
              <Route  path='/' element={<Home/>}/>
              <Route  path='/' element={<LayoutAdmin/>}>
                <Route  path='inicio' element={<Dashboard/>}/>
                <Route  path='perfil' element={<Perfil/>}/>
                <Route  path='proyectos' element={<Proyectos/>}/>
                <Route  path='usuarios2' element={<ListaUsuariosC4/>}/>
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
