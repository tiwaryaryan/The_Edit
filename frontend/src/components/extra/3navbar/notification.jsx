
import { Link, Navigate } from "react-router-dom";



const logo = () => {

   

    return (

        <>
            <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                    <i className="fi fi-rr-bell text-2xl block mt-1"></i>
                </button>
            </Link>
        </>
    )
}

export default logo;