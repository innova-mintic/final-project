import React, { useState }from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import {ApolloProvider, ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client";
import 'styles/globals.css';
import 'styles/tabla.css';
/* import 'styles/styles.css'; */

import Home from 'Pages/Home';
import Dashboard from 'Pages/inicio/index';
import Perfil from 'Pages/perfil/index';
import Proyectos from 'Pages/proyectos/index';
import Usuarios from 'Pages/usuarios/index';
import EditarUsuario from 'Pages/usuarios/editar';
import LayoutAdmin from 'layouts/LayoutAdmin';
import ListaUsuariosC4 from 'Pages/ListaUsuarios';
import Solicitudes from 'Pages/solicitudes';

import EditarProyecto from 'Pages/proyectos/editar';
import Creacion from 'Pages/creacion';
import CreacionProyecto from 'Pages/crearProyecto';
import { UserContext } from 'context/user';
//import PrivateLayout from 'layouts/PrivateLayout';
//import PublicLayout from 'layouts/PublicLayout';


const client= new ApolloClient({
  uri:'https://innova1.herokuapp.com/graphql',
  cache:new InMemoryCache(),
});

/* const client= new ApolloClient({
  uri:'http://localhost:4000/graphql',
  cache:new InMemoryCache(),
}); */

function App() {

  const [userData, setUserData] = useState({});

  return (

    <ApolloProvider client={client}>
       <Auth0Provider
          domain="innova-mintic.us.auth0.com"
          clientId="4OfDznBV7xftZ5kCuQm2VNebA4mXk5Rp"
          redirectUri={'https://mysterious-hollows-06532.herokuapp.com/inicio'}
        >
          <div>
          <UserContext.Provider value={{userData, setUserData}}>
            <Router>
              <Routes>
                <Route  path='/' element={<Home/>}/>
                <Route  path='/' element={<LayoutAdmin/>}>
                  <Route  path='/inicio' element={<Dashboard/>}/>
                  <Route  path='/creacion' element={<Creacion/>}/>
                  <Route  path='/perfil' element={<Perfil/>}/>
                  <Route  path='/proyectos' element={<Proyectos/>}/>
                  <Route  path='/proyectos/editar/:_id' element={<EditarProyecto/>}/>
                  <Route  path='/creacionProyecto' element={<CreacionProyecto/>}/>
                  <Route  path='/usuarios' element={<Usuarios/>}/>
                  <Route  path='/usuarios/editar/:_id' element={<EditarUsuario/>}/>
                  <Route  path='/usuarios2' element={<ListaUsuariosC4/>}/>

                  <Route  path='/solicitudes' element={<Solicitudes/>}/>
                  
                </Route>
              </Routes>
            </Router>
          </UserContext.Provider>
          </div>
          
        </Auth0Provider>
    </ApolloProvider>  
      
   
      
  );
}

export default App;
