import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const logo = () => {

    return (

        <>
            <Link to="/write" className="flex gap-1.5 items-center">
                <i className="fi fi-rr-file-edit"></i>
                <p className="pl-1">Write</p>
            </Link>

        </>
    )
}

export default logo;