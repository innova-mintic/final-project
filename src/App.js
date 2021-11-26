import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

import './App.css';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Auth0Provider
    domain="innova-mintic.us.auth0.com"
    clientId="4OfDznBV7xftZ5kCuQm2VNebA4mXk5Rp"
    redirectUri={'https://mysterious-hollows-06532.herokuapp.com/dashboard'}
    >
      <div>
        <Router>
          <Routes>
            <Route exact 
              path="/" element={<Home/>}
            />
            <Route exact 
              path="/dashboard" element={<Dashboard/>}
            />
          </Routes>
        </Router>
      </div>
    </Auth0Provider>
      
  );
}

export default App;
