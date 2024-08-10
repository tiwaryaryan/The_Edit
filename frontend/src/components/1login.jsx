import COVER_IMAGE from './imgs/cover4.jpg';
import { Link, Navigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from './extra/ex/1session.jsx';
import { usercontext } from '../App';

const Login = () => {
  let { userAuth: { access_token }, setuserAuth } = useContext(usercontext);

  console.log(access_token);

  // Sending request to server  
  const login_server = (details) => {
    axios.post('http://localhost:3000/login', details)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        toast.success("Logging in");
        setuserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error); // Error coming from server
      });
  };

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handle_change = (evt) => {
    const { name, value } = evt.target; // Object destructuring
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
   // console.log(name , value) - email 12345678@gmail.com password 12345678
  };

 

  const handle_submit = (evt) => {
    evt.preventDefault();
    login_server(details); // Sending request to server
  };

  return (
    access_token ? <Navigate to="/" /> :

    <div className="w-full h-screen flex flex-col lg:flex-row items-start">
      <div className='relative w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col'>
        <div className='absolute top-[20%] left-[10%] flex flex-col'>
          <h1 className='text-3xl lg:text-5xl text-white font-bold my-4'>The_Edit</h1>
          <p className='text-xl lg:text-3xl text-white font-bold'>A heaven, where your ideas take wings</p>
        </div>
        <img src={COVER_IMAGE} className='w-full h-full object-cover' alt="Cover" />
      </div>

      <div className='w-full lg:w-1/2 h-1/2 lg:h-full bg-[#f5f5f5] flex flex-col p-10 lg:p-20 justify-between'>
        <h1 className='text-2xl lg:text-4xl text-[#060606] font-semibold'>The_Edit🍀</h1>

        <Toaster />

        <form onSubmit={handle_submit} className="w-full flex flex-col">
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-xl lg:text-3xl font-semibold mb-4'>Login</h3>
            <p className='text-lg lg:text-2xl mb-2 font-medium'>Welcome back, please enter your details</p>
          </div>

          <div className='w-full flex flex-col max-w-[470px]'>
            <input
              name="email"
              type='email'
              onChange={handle_change}
              placeholder='Email'
              className='w-full text-black py-4 my-1 bg-transparent border-b border-black outline-none focus:outline-none' />

            <input
              name='password'
              type='password'
              onChange={handle_change}
              placeholder='Password'
              className='w-full text-black py-4 my-1 bg-transparent border-b border-black outline-none focus:outline-none' />
          </div>

          <div className='w-full flex flex-col max-w-[470px] mt-7'>
            <button className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center transition duration-300 ease-in-out hover:opacity-70'
              type='submit'>
              Login
            </button>
          </div>
        </form>

        <div className='w-full flex item-center justify-center'>
          <p className='text-base font-normal'>Don't have an account? <Link to="/signup" className='font-medium underline underline-offset-2 cursor-pointer'>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
