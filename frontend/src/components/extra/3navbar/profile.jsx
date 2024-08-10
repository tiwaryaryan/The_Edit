import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useContext } from 'react';
import React from "react";



const logo = (props) => {

    let profile_img = props.p;
    let username = props.u;

    return (

        <>
            <div className="flex  items-center ">
                    <Link to = {`/user/${username}`}>
                    <button className="w-12 h-12 mt-1 ml-3">
                        <img src={profile_img} className="w-full h-full object-cover rounded-full" alt="Profile" />
                    </button>
                    </Link>
                </div>

        </>
    )
}

export default logo;