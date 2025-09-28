import React from 'react';
import bg from '../assets/bg.png';
import background from '../assets/background.png';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Home = () => (
  <div
    className="w-full h-[calc(100vh-6rem)] relative bg-no-repeat bg-center bg-cover"
    style={{ backgroundImage: `url(${background})` }}>
    
    <div className='sm:w-2/3 md:w-1/3 mx-10 lg:ms-32 pt-64 md:pt-48 lg:pt-32 flex flex-col justify-center'>
      <div className="bg-white sm:text-2xl lg:text-4xl bg-opacity-50 p-6 rounded-lg">
        <h1 className="uppercase font-extrabold text-blue-900 drop-shadow-lg">
          Manage your <span>Task</span> Effortlessly
        </h1>
      </div>
      <div className='mt-8 ps-5 text-blue-950'>
        <p>
          Stay organized and on top of your tasks with ease. Add, edit, and track your daily to-dos all in one place, so you can focus on what really matters and make every day productive. 
          Set priorities, never miss a deadline, and see your progress at a glance. With everything in one simple dashboard, managing your tasks has never been easier.<br />
        </p>
      </div>
      <div className='text-blue-600 flex justify-end pr-4 w-full font-semibold'>
        <Link 
          to="/tasks" 
          className='flex gap-2 items-center bg-white bg-opacity-90 hover:bg-opacity-70 rounded-lg px-3 py-1 my-4'>
          <span>ADD TASKS</span>
          <FaArrowRightLong />
        </Link>
      </div>
    </div>

    {/* Image */}
    <div>
      <img 
        className='
          absolute 
           top-0 right-0  
          md:top-12 md:right-1  
          h-[30%] w-[60%] 
          sm:h-[30%] sm:w-[50%]
          md:h-[50%] md:w-[50%] 
          lg:h-[60%] lg:w-[40%] 
          xl:h-[60%] xl:w-[40%]
        ' 
        src={bg} 
        alt="background"
      />
    </div>
  </div>
);

export default Home;
