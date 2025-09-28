import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const NavLink = [
    {
        url: "/",
        text: "Home"
    },
    {
        url: "tasks",
        text: "View Tasks"
    },
    {
        url: "login",
        text: "Login"
    },
    {
        url: "register",
        text: "Sign Up"
    },
]
 

  return (
     <header className='bg-blue-900  grid sm:grid-cols-1 lg:grid-cols-[65%_35%]  w-full h-36 lg:h-24 border-b-2 shadow-lg '>
            <div className=' flex justify-around items-center my-4 lg:my-0'>
                
                <h2 className='text-center text-yellow-300 bg-yellow-50 bg-opacity-20 p-1 px-2 rounded-lg mx-auto w-fit text-4xl font-serif font-extrabold '>SmartTaskManager</h2>
            </div>
            <div className=' h-full text-center pr-2 flex justify-around items-center'>
                {NavLink.map((item) => (
                    <Link key={item.text} className='text-blue-900 bg-yellow-200 font-bold  hover:text-slate-100 px-3 py-1 rounded-md hover:bg-slate-800 ' children={item.text} to={item.url} />
                ))}
            </div>

        </header>
  );
};

export default Navbar;