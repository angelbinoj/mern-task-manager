 import React from 'react'
import { Navigate } from 'react-router-dom'


const isLoggedIn = () => {
    return localStorage.getItem("token")

}

function ProtectedRoute({ children }) {


    if (!isLoggedIn()) {
        return <Navigate replace to='/login' />
    }

    return <>{children}</>
}

export default ProtectedRoute