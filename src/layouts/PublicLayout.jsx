import React from 'react'
import Navbar from '../components/NavBar'

const PublicLayout = ({children}) => {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default PublicLayout