import React from 'react'
import Navbar from '../components/Navbar'

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