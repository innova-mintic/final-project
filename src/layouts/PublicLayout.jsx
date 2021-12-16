import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar'

const PublicLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default PublicLayout