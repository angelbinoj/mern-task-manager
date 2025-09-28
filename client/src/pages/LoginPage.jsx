import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {

    const [userData, setUserData] = useState({ username: "", password: "" })
    const [alertMessage, setAlertMessage] = useState("");
    const [alertColor, setAlertColor] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate()

    const handleChange = async (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await axios.post('https://mern-task-manager-backend-phi.vercel.app/api/auth/login', userData, { withCredentials: true })
            if (data?.success) {
                localStorage.setItem('token', (data.data.token));
                setAlertMessage(data.data.message);
                setAlertColor("text-green-700")
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false);
                    navigate('/tasks')

                }, 1000);
            }
            console.log(userData);
            console.log(data.data.message);
            

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.error.message);
                setAlertMessage(error.response.data.error.message);
                setAlertColor("text-red-600")
            }
        }

    }

return (
    <div className='flex flex-col mx-auto mt-10 items-center bg-stone-300 rounded-md text-slate-950 font-medium w-96 px-6 pb-10'>
        <h1 className=' text-2xl my-10 font-bold uppercase '>LOGIN</h1>
        <form onSubmit={handleSubmit} className=' flex flex-col px-auto gap-4 w-10/12' >

            <input className='h-10 ps-4  rounded-md' type="text" name="username" placeholder='Username' onChange={handleChange} autoComplete='off' required />
            <input className='h-10 ps-4  rounded-md' type="password" name="password" placeholder='Password' onChange={handleChange} autoComplete='off' required />
            <div className={`mt-1 text-lg font-bold ${alertColor}`}>
                 {alertMessage}</div>


            <div className=' mt-5 flex gap-3 justify-around'>
                <button type='reset' className=' text-slate-100 px-10 py-2 rounded-md bg-slate-800 hover:bg-slate-600'>Cancel</button>
                <button type='submit' className='text-slate-100 px-10 py-2 rounded-md bg-green-700 hover:bg-green-600'>Login</button>
            </div>
            <p>Not a User?<Link to="/register"><span className='text-blue-600 hover:text-blue-500 font-semibold'> Sign Up</span></Link></p>
        </form>
    </div>
)
}

export default LoginPage