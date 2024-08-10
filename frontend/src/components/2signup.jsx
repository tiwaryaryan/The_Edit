import COVER_IMAGE from './imgs/cover6.jpg';
import { Link, Navigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from './extra/ex/1session.jsx';
import { usercontext } from '../App';

const Signup = () => {
    let { userAuth: { access_token }, setuserAuth } = useContext(usercontext);

    // Sending request to server
    const signup_server = (details) => {
        axios.post('https://the-edit.onrender.com/signup', details)
            .then(({ data }) => {
                toast.success("Account created");
                storeInSession("user", JSON.stringify(data));
                setuserAuth(data);
            })
            .catch(({ response }) => {
                toast.error(response.data.error); // Error coming from server
            });
    };

    const [details, setDetails] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handle_change = (evt) => {
        const { name, value } = evt.target; // Object destructuring
        setDetails((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handle_submit = (evt) => {
        evt.preventDefault(); // By default form data vanishes in 1 sec
        signup_server(details); // Sending request to server
    };

    return (
        access_token ? <Navigate to="/" /> :

        <div className="w-full h-screen flex flex-col lg:flex-row items-start">
            <div className='relative w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col'>
                <div className='absolute top-[20%] left-[10%] flex flex-col'>
                    <h1 className='text-3xl lg:text-5xl text-white font-bold my-4'>The_Edit</h1>
                    <p className='text-xl lg:text-3xl text-white font-bold'>From sparks to sky, watch your ideas take flight.</p>
                </div>
                <img src={COVER_IMAGE} className='w-full h-full object-cover' alt="Cover" />
            </div>

            <div className='w-full lg:w-1/2 h-1/2 lg:h-full bg-[#f5f5f5] flex flex-col p-10 lg:p-20 justify-between'>
                <h1 className='text-2xl lg:text-4xl text-[#060606] font-semibold'>The_Edit🍀</h1>

                <div className='w-full flex flex-col'>
                    <Toaster />

                    <form onSubmit={handle_submit}>
                        <div className='w-full flex flex-col mb-2'>
                            <h3 className='text-xl lg:text-3xl font-semibold mb-4'>Sign-up</h3>
                            <p className='text-lg lg:text-2xl mb-2 font-medium'>Join us today!</p>
                        </div>

                        <div className='w-full flex flex-col max-w-[470px] justify-center'>
                            <input
                                name="name"
                                onChange={handle_change}
                                type='text'
                                placeholder='Name'
                                className='w-full text-black py-4 my-1 bg-transparent border-b border-black outline-none focus:outline-none' />

                            <input
                                name="email"
                                onChange={handle_change}
                                type='email'
                                placeholder='Email'
                                className='w-full text-black py-4 my-1 bg-transparent border-b border-black outline-none focus:outline-none' />

                            <input
                                name='password'
                                onChange={handle_change}
                                type='password'
                                placeholder='Set-Password'
                                className='w-full text-black py-4 my-1 bg-transparent border-b border-black outline-none focus:outline-none' />
                        </div>

                        <div className='w-full flex flex-col max-w-[470px] mt-7'>
                            <button className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center transition duration-300 ease-in-out hover:opacity-70'
                                type='submit'>
                                Sign-up
                            </button>
                        </div>
                    </form>
                </div>

                <div className='w-full flex item-center justify-center'>
                    <p className='text-base font-normal'>Already have an account? <span className='font-medium underline underline-offset-2 cursor-pointer'><Link to="/login">Login</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

// import COVER_IMAGE from './imgs/cover6.jpg';
// import { Link, redirect  , Navigate} from 'react-router-dom';
// import { useState } from 'react';
// import {Toaster , toast} from 'react-hot-toast';
// import axios from 'axios';
// import { useToast } from '@chakra-ui/react'
// import { storeInSession } from './extra/ex/1session.jsx'
// import { usercontext } from '../App';
// import { useContext } from 'react';


// const Signup = () => {


//     let {userAuth: {access_token} , setuserAuth} = useContext(usercontext)
//                 //destrcuturing


//     //sending req to server
//     const signup_server = (details) => {

//         axios.post('https://the-edit.onrender.com/signup' , details)
//         .then(( {data} ) => {

//             toast.success("Account created");
//             storeInSession("user", JSON.stringify(data));
//             setuserAuth(data);

//         })
//         .catch(({response}) => {  //respose will only come in this
//             toast.error(response.data.error);  //error coming from server
//         })
//     }

//     const [details , setDetails] = useState({   //detail-data , setDetails - adding new data to details

//         name: "",
//         email: "",
//         password: "",
//     });

//     const handle_change = (evt) => {

//         const {name , value} = evt.target; //object destructuring
//         //console.log(name , value)
//         setDetails((prev) => {
//             return{...prev, [name]: value}
//         });
//     }

//     //console.log(details);


//     const handle_submit = (evt) =>{
//         evt.preventDefault();        //by default form data vanishes in 1 sec
//         //console.log(details);


//         signup_server(details);//sending req server

//     }
    

//     return (

//         access_token ?<Navigate to = "/" /> : 


//         <div className="w-full h-screen flex items-start">
//             <div className='relative w-1/2 h-full flex flex-col'>
//                 <div className='absolute top-[20%] left-[10%] flex flex-col'>
//                     <h1 className='text-5xl text-white font-bold my-4 '>The_Edit</h1>
//                     <p className='text-3xl text-white font-bold'>From sparks to sky, watch your ideas take flight. </p>
//                 </div>
//                 <img src={COVER_IMAGE} className='w-full h-full object-cover' />
//             </div>

//             <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
//                 <h1 className='text-4xl text-[#060606] font-semibold'>The_Edit🍀</h1>

//                 <div className='w-full flex flex-col'>

//                     <Toaster/> 

//                     <form  onSubmit={handle_submit}>   
//                         <div className='w-full flex flex-col mb-2'>
//                             <h3 className='text-3xl font-semibold mb-4'>Sign-up</h3>
//                             <p className='text-2xl mb-2 font-medium'>Join us today!</p>
//                         </div>


//                         <div className='w-full flex flex-col max-w-[470px] justify-center'>

//                             <input
//                                 name="name"
//                                 onChange={handle_change}
//                                 type='text'
//                                 placeholder='Name'
//                                 className='w-full text-black py-4 my-1 bg-transparent border-b border-black outline-none focus:outline-none' />

//                             <input
//                                 name="email"
//                                 onChange={handle_change}
//                                 type='email'
//                                 placeholder='Email'
//                                 className='w-full text-black py-4 my-1 bg-transparent border-b border-black outline-none focus:outline-none' />

//                             <input
//                                 name='password'
//                                 onChange={handle_change}
//                                 type='password'
//                                 placeholder='Set-Password'
//                                 className='w-full text-black py-4 my-1 bg-transparent border-b border-black outline-none focus:outline-none' />
//                         </div>


//                         <div className='w-full flex flex-col max-w-[470px] mt-7'>
//                             <button className='w-full text-white my-2 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center transition duration-300 ease-in-out hover:opacity-70'
//                                     type='submit'>
//                                     Sign-up
//                             </button>
//                         </div>
//                     </form>

//                 </div>

//                 <div className='w-full flex item-center justify-center'>
//                     <p className='text-base font-normal ' >Already have an account? <span className='font-medium underline underline-offset-2 cursor-pointer'> <Link to="/login">Login</Link> </span>  </p>
//                 </div>


//             </div>

//         </div>
//     )
// }

// export default Signup;