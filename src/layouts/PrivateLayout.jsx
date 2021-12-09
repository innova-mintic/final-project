import PrivateRoute from 'components/PrivateRoute'
import Sidebar from 'components/Sidebar'
import React from 'react'

const PrivateLayout = () => {
    return (
        <PrivateRoute>
            <div className="flex">
                <Sidebar />
                <main className="Main">
                    {children}
                </main>
            </div>
        </PrivateRoute>
    )
}

export default PrivateLayout
