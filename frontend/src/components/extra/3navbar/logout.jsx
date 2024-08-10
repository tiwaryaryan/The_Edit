
import { Link, Navigate } from "react-router-dom";
// import { useContext } from 'react';
// import { usercontext } from '../App';

const logo = (props) => {

    let logout = props.l;

    return (

        <>
            <div className="hidden md:flex items-center gap-3">
                    <Link to="/login">
                    <button className="flex gap-1.5 items-center " onClick={logout}>
                        <i className="fi fi-rr-power text-3xl"></i>
                    </button>
                    </Link>
                </div>
        </>
    )
}

export default logo;