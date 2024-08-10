
import { Link, Navigate } from "react-router-dom";


const logo = () => {

    return (

        <>
            <Link to="/" className="flex ">
                <p className="relative top-2 text-3xl">The_Edit</p>
                <p className="w-full text-4xl">🍀</p>
            </Link>
        </>
    )
}

export default logo;