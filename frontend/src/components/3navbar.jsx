// import { useState } from "react";
// import { Link } from "react-router-dom";
// import profile_img from './imgs/profile.jpg';
// import Side from './extra/1nav.jsx'


// const navbar = () => {

//     const [searchBoxvisibility, setSearchBoxvisibility] = useState(false);

//     return (
//         <nav className="navbar">

//             <Link to="/" className="flex-none w-10">
//                 <p className="w-full text-4xl" >🍀</p>
//             </Link>

//             <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto  md:show " + (searchBoxvisibility ? "show" : "hide")}>
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] 
//                     md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
//                 />
//                 {/* flat icon */}
//                 <i className="fi fi-rr-search absolute 
//                  right-[10%] md:pointer-events-none md:left-5 
//                 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
//             </div>

//             <div className="flex items-center gap-3 md:gap-6 ml-auto ">

//                 <button className="md:hidden bg-grey w-12 h-12 rounded-full items-center justify-center" onClick={() => setSearchBoxvisibility(currentVal => !currentVal)}>
//                     <i className="fi fi-rr-search text-xl"></i>
//                 </button>

//                 <Link to="/editor" className="hidden md:flex gap-1.5 items-center">
//                     <i className="fi fi-rr-file-edit"></i>
//                     <p>Write</p>
//                 </Link>

//                 <Link to="/dashboard/notification">
//                     <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
//                         <i className="fi fi-rr-bell text-2xl block mt-1"></i>
//                     </button>
//                 </Link>

//                 <div className="relative">

//                     <button className="w-12 h-12 mt-1">
//                         <img src={profile_img} className="w-full h-full object-cover rounded-full" />
//                     </button>

//                 </div>




//             </div>



//         </nav>
//     )
// }

// export default navbar;


// import { useState } from "react";
// import { Link } from "react-router-dom";
// import profile_img from './imgs/profile.jpg';
// import Side from './extra/1nav.jsx';

// const Navbar = () => {
//     const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
//     const [menuVisibility, setMenuVisibility] = useState(false);

//     return (
//         <nav className="navbar flex items-center p-4 bg-white shadow-md relative">
//             <Link to="/" className="flex-none w-10">
//                 <p className="w-full text-4xl">🍀</p>
//             </Link>

//             <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " + (searchBoxVisibility ? "block" : "hidden")}>
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
//                 />
//                 <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
//             </div>

//             <div className="flex items-center gap-3 md:gap-6 ml-auto">
//                 <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}>
//                     <i className="fi fi-rr-search text-xl"></i>
//                 </button>

//                 <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setMenuVisibility(currentVal => !currentVal)}>
//                     <i className="fi fi-rr-menu-burger text-xl"></i>
//                 </button>

//                 <div className="hidden md:flex items-center gap-3">
//                     <Link to="/editor" className="flex gap-1.5 items-center">
//                         <i className="fi fi-rr-file-edit"></i>
//                         <p>Write</p>
//                     </Link>

//                     <Link to="/dashboard/notification">
//                         <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
//                             <i className="fi fi-rr-bell text-2xl block mt-1"></i>
//                         </button>
//                     </Link>

//                     <div className="relative">
//                         <button className="w-12 h-12 mt-1">
//                             <img src={profile_img} className="w-full h-full object-cover rounded-full" alt="Profile" />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {menuVisibility && (
//                 <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-4 md:hidden">
//                     <Link to="/editor" className="flex gap-1.5 items-center w-full py-2">
//                         <i className="fi fi-rr-file-edit"></i>
//                         <p>Write</p>
//                     </Link>

//                     <Link to="/dashboard/notification" className="w-full py-2">
//                         <button className="w-full flex items-center">
//                             <i className="fi fi-rr-bell text-2xl block mt-1"></i>
//                             <span className="ml-2">Notifications</span>
//                         </button>
//                     </Link>

//                     <button className="w-full flex items-center mt-2">
//                         <img src={profile_img} className="w-12 h-12 object-cover rounded-full" alt="Profile" />
//                         <span className="ml-2">Profile</span>
//                     </button>
//                 </div>
//             )}
//         </nav>
//     );
// }

// export default Navbar;




import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
//import profile_img from './imgs/profile.jpg';
// import Side from './extra/1nav.jsx';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './3navbar.css';
import { useContext } from 'react';
import { usercontext } from '../App';
import { removeFromSession } from "./extra/ex/1session.jsx";
import Logo from "./extra/3navbar/logo.jsx";
import Logout from "./extra/3navbar/logout.jsx";
import Profile from "./extra/3navbar/profile.jsx";
import Search from "./extra/3navbar/search.jsx";
import Searchbox from "./extra/3navbar/searchbox.jsx";
import Write from "./extra/3navbar/write.jsx";
import Noti from "./extra/3navbar/notification.jsx";
import Menu from "./extra/3navbar/menu.jsx";
import PROFILE_IMAGE from './imgs/profile.jpg';

const Navbar = () => {

    let { userAuth, userAuth: { access_token, profile_img, username }, setuserAuth } = useContext(usercontext);

    if (!profile_img) {
        profile_img = PROFILE_IMAGE;
    }

    const logout = () => {
        removeFromSession("user");
        setuserAuth({ access_token: null });
    }

    let navigate = useNavigate();


    const [menuVisibility, setMenuVisibility] = useState(false);
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);


    const handle_search = (e) => {

        let query = e.target.value;
        // console.log(e);
        if (e.keyCode == 13 && query.length) {
            navigate(`/search/${query}`)
        }
    }

    return (


        // access_token ?


        <nav className="navbar flex items-center p-4 bg-white shadow-md relative">

            <Logo />


            {/* searchbox */}

            <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " + (searchBoxVisibility ? "block" : "hidden")}>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                    onKeyDown={handle_search}
                />
                <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
            </div>

            <div className="flex items-center gap-3 md:gap-6 ml-auto">


                <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}>
                    <i className="fi fi-rr-search text-xl"></i>
                </button>


                <div className="hidden md:flex items-center gap-3 absolute right-[120px]">

                    <Write />
                    <Noti />

                </div>


                {/* parent to child */}
               
                <Profile p={profile_img} u={username} />


                <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setMenuVisibility(currentVal => !currentVal)}>
                    <i className="fi fi-rr-menu-burger text-xl"></i>
                </button>


                <Logout l={logout} />

            </div>



            {/* Mobile Menu */}
            {menuVisibility && (


                <Menu l={logout} />
            )}
        </nav>

         //: <Navigate to = "/login" />   //if acess token if not there you can never see the navbar even if try from browser (!! do this in home write and other pages)
    );
}

export default Navbar;


