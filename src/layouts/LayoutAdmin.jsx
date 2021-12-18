import Sidebar from 'components/Sidebar';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from 'components/PrivateRoute';

const LayoutAdmin = () => {
  return (
    <PrivateRoute>
      <div className='flex flex-col md:flex-row flex-no-wrap h-screen'>
      <Sidebar />
      <div className='flex w-full h-full'>
        <div className='w-full h-full  overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
    </PrivateRoute>
    
  );
};

export default LayoutAdmin;
