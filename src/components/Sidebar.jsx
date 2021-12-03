import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";
import '../styles/sidebar.css'

const SidebarLinks = () => {

  const { logout } = useAuth0();
    
    const cerrarSesion = () => {
        logout({ returnTo: window.location.origin });
        localStorage.setItem('token', null);
    }

  return (
    <ul className='mt-12'>
      <SidebarRoute to='inicio' title='Inicio' icon='fas fa-home' />
      <SidebarRoute to='creacion' title='Registro' icon='fas fa-smile-wink' />
      <SidebarRoute to='perfil' title='Perfil' icon='fas fa-smile-wink' />
      <SidebarRoute to='usuarios' title='Usuarios' icon='fas fa-user' />
      <SidebarRoute to='usuarios2' title='Usuarios2' icon='fas fa-user' />
      <SidebarRoute to='proyectos' title='Proyectos' icon='fas fa-book-open' />
      <SidebarRoute to='creacionProyecto' title='Crear Proyecto' icon='fas fa-book-open' />

      <div className="logout">
        <button className="btn btn-outline-primary" onClick={() => cerrarSesion()}>
          Log Out
        </button>
      </div>
     
    </ul>
  );
};

const Logo = () => {
  return (
    <div className='py-3 w-full flex flex-col items-center justify-center'>
      <img src='logo.png' alt='Logo' className='h-16' />
      <span className='my-2 text-xl font-bold text-center'>Gestor de Proyectos</span>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex flex-col md:flex-row flex-no-wrap md:h-full'>
      {/* Sidebar starts */}

      <div className='sidebar hidden md:flex'>
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
      <div className='flex md:hidden w-full justify-between bg-gray-800 p-2 text-white'>
        <i className={`fas fa-${open ? 'times' : 'bars'}`} onClick={() => setOpen(!open)} />
        <i className='fas fa-home' />
      </div>
      {open && <ResponsiveSidebar />}
      {/* Sidebar ends */}
    </div>
  );
};

const ResponsiveSidebar = () => {
  return (
    <div>
      <div
        className='sidebar h-full z-40 absolute md:h-full sm:hidden transition duration-150 ease-in-out'
        id='mobile-nav'
      >
        <div className='px-8'>
          <Logo />
          <SidebarLinks />
        </div>
      </div>
    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebar-route text-white bg-indigo-700'
            : 'sidebar-route text-gray-900 hover:text-white hover:bg-indigo-400'
        }
      >
        <div className='flex items-center'>
          <i className={icon} />
          <span className='text-sm  ml-2'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
