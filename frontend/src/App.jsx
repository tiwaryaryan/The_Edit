//import Navbar from './components/navbar.component'
//import Signin from './components/1.jsx'
// import './index.css'
import {Routes , Route} from "react-router-dom";
import Login from './components/1login.jsx'
import Signup from './components/2signup.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Nav from './components/3navbar.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react'
import Write from './components/4write.jsx'
import Home from './components/5home.jsx'
import Trend from './components/5trend.jsx'
import Search from './components/6search.jsx'
import Profile from './components/7profile.jsx'
import Showblog from './components/8showblog.jsx'
import { lookInSession } from './components/extra/ex/1session.jsx'
import { createContext , useEffect , useState } from 'react';

export const usercontext = createContext({});

const App = () => {

    const [userAuth , setuserAuth] = useState({});

    useEffect(() => {

        let userinsession = lookInSession("user");

        userinsession ? setuserAuth(JSON.parse(userinsession)): setuserAuth({access_token: null});
    } , [])

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />
        },

        {
            path: "/signup",
            element: <Signup />
        },

        {
            path: "/",
            element: <Home />
        },

        {
            path: "/write",
            element: <Write />
        },

        {
            path: "/nav",
            element: <Nav />
        },

        {
            path: "/trending",
            element: <Trend />
        },

        {
            path: "/user/:id",
            element: <Profile/>

        },
 
        {
            path: "/search/:query",
            element: <Search/>

        },

        {
            path: "/blog/:blog_id",
            element: <Showblog/>

        },

        {
            path: "/editor/:blog_id",
            element: <Write />

        },


        



    ])
    return (
        <div>
            <usercontext.Provider value={{userAuth , setuserAuth}}>
                <ChakraProvider>
                    <RouterProvider router={router} />
                </ChakraProvider>
            </usercontext.Provider>
        </div>
    )
}

export default App;





// import {Routes , Route} from "react-router-dom";
// import Login from './components/1login.jsx'
// import Signup from './components/2signup.jsx'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Nav from './components/3navbar.jsx'
// import { ChakraProvider } from '@chakra-ui/react'
// import * as React from 'react'
// import Write from './components/4write.jsx'
// import Home from './components/5home.jsx'
// import Trend from './components/5trend.jsx'
// import Search from './components/6search.jsx'
// import Profile from './components/7profile.jsx'
// import Showblog from './components/8showblog.jsx'
// import { lookInSession } from './components/extra/ex/1session.jsx'
// import { createContext , useEffect , useState } from 'react';


// export const UserContext = createContext({});

// const PrivateRoute = ({ children }) => {
//   const { userAuth } = React.useContext(UserContext);
//   return userAuth.access_token ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   const [userAuth, setUserAuth] = useState({});

//   useEffect(() => {
//     let userInSession = lookInSession("user");
//     userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ access_token: null });
//   }, []);

//   return (
//     <div>
//       <UserContext.Provider value={{ userAuth, setUserAuth }}>
//         <ChakraProvider>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
//             <Route path="/write" element={<PrivateRoute><Write /></PrivateRoute>} />
//             <Route path="/nav" element={<PrivateRoute><Nav /></PrivateRoute>} />
//             <Route path="/trending" element={<PrivateRoute><Trend /></PrivateRoute>} />
//             <Route path="/user/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
//             <Route path="/search/:query" element={<PrivateRoute><Search /></PrivateRoute>} />
//             <Route path="/blog/:blog_id" element={<PrivateRoute><Showblog /></PrivateRoute>} />
//             <Route path="/editor/:blog_id" element={<PrivateRoute><Write /></PrivateRoute>} />
//           </Routes>
//         </ChakraProvider>
//       </UserContext.Provider>
//     </div>
//   );
// };

// export default App;


// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from './components/1login.jsx';
// import Signup from './components/2signup.jsx';
// import Nav from './components/3navbar.jsx';
// import { ChakraProvider } from '@chakra-ui/react';
// import * as React from 'react';
// import Write from './components/4write.jsx';
// import Home from './components/5home.jsx';
// import Trend from './components/5trend.jsx';
// import Search from './components/6search.jsx';
// import Profile from './components/7profile.jsx';
// import Showblog from './components/8showblog.jsx';
// import { lookInSession } from './components/extra/ex/1session.jsx';
// import { createContext, useEffect, useState } from 'react';

// export const userContext = createContext({});

// const PrivateRoute = ({ children }) => {
//   const { userAuth } = React.useContext(userContext);

//   // Debugging: Log userAuth state
//   console.log("User Auth: ", userAuth);

//   return userAuth.access_token ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   const [userAuth, setUserAuth] = useState({ access_token: null });

//   useEffect(() => {
//     const userInSession = lookInSession("user");

//     if (userInSession) {
//       setUserAuth(JSON.parse(userInSession));
//     } else {
//       setUserAuth({ access_token: null });
//     }

//     // Debugging: Log initial state
//     console.log("Initial User Auth: ", userAuth);
//   }, []);

//   return (
//     <UserContext.Provider value={{ userAuth, setUserAuth }}>
//       <ChakraProvider>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
//           <Route path="/write" element={<PrivateRoute><Write /></PrivateRoute>} />
//           <Route path="/nav" element={<PrivateRoute><Nav /></PrivateRoute>} />
//           <Route path="/trending" element={<PrivateRoute><Trend /></PrivateRoute>} />
//           <Route path="/user/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
//           <Route path="/search/:query" element={<PrivateRoute><Search /></PrivateRoute>} />
//           <Route path="/blog/:blog_id" element={<PrivateRoute><Showblog /></PrivateRoute>} />
//           <Route path="/editor/:blog_id" element={<PrivateRoute><Write /></PrivateRoute>} />
//         </Routes>
//       </ChakraProvider>
//     </UserContext.Provider>
//   );
// };

// export default App;
