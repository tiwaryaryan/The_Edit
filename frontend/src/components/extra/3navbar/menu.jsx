import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
//import profile_img from '../imgs/profile.jpg';
import { useContext } from 'react';
import React from "react";



const logo = (props) => {

    let logout = props.l;

    return (

        <>
            <div className="absolute top-full right-2  bg-white shadow-md flex flex-col items-start p-4 pr-[60px] md:hidden">
                    
                    <ul className="ul1  ">
                        <li>
                        <Link to="/write" className="flex gap-1.5 items-center w-full py-2  ">
                        <i className="fi fi-rr-file-edit"></i>
                        <p className="pl-1 w-full">Write</p>
                        </Link>
                        </li>

                        
                        <li>
                        <Link to="/dashboard/notification" className="w-full py-2">
                        <button className="w-full flex items-center">
                            <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                            <p className="ml-2 w-full">Notifications</p>
                        </button>
                        </Link>
                        </li>


                        <li>
                        <Link to="/login">
                        <button className="w-full flex items-center" onClick={logout}>
                        <i className="fi fi-rr-power text-2xl block mt-1"></i>
                            <p className="ml-2 ">Logout</p>
                        </button>      
                        </Link>
                        </li>
                    </ul>


                </div>
        </>
    )
}

export default logo;


