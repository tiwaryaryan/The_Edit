
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
//import profile_img from './imgs/profile.jpg';
// import Side from './extra/1nav.jsx';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './3navbar.css';
import { useContext } from 'react';
import { usercontext } from '../App';
import Nav from './3navbar.jsx';
import axios from "axios";
import { useEffect } from "react";
import { Toaster, toast } from 'react-hot-toast';
import Blogcard from './extra/5home/blogcard.jsx'
import Trendcard from './extra/5home/trendcard.jsx';
import Usercard from './extra/6search/usercard.jsx';


const home = () => {

    let { query } = useParams();  //to use paramenter in search

    let [blogs, setBlogs] = useState(null);
    let [pagestate, setpagestate] = useState("Home");
    let [userinfo, setUserinfo] = useState(null);




    //console.log(query);




    const fetchtagblogs = () => {

        axios.post("http://localhost:3000/trend-card", { query: query })
            .then(({ data }) => {
                // console.log(query);
                //console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
                setBlogs(data.blogs)
                if (data.blogs.length == 0) {
                    setBlogs(null);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }



    const fetchusers = () => {

        axios.post("http://localhost:3000/search-user", { query: query })
            .then(({ data }) => {
                //console.log(data.users);   //for getting something in . like data.blog you need to pass it in like obj {data}
                setUserinfo(data.users)
                if (data.users.length == 0) {
                    setUserinfo(null);
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const load = () => {

        // console.log("called");
        setBlogs(null);
        setUserinfo(null);
        setpagestate(query);
    }

    const no_match = () => {

        return (
            <div className="text-xl relative left-[130px]">
                <h1>No match Found</h1>
            </div>
        )
    }



    useEffect(() => {

        load();

        fetchtagblogs();

        fetchusers();


    }, [query]) //this means whenever there is change in query call use effect







    return (
        <>

            <Nav />

            <section className="h-cover flex justify-center gap-10">

                {/* blog cards */}
                <div className="w-full mt-[20px] ">

                    <div className="flex border-b-4 mb-[40px]">

                        <div className="w-full">
                            <p className="relative left-[00px] mb-[20px]  text-3xl capitalize">{`Results for "${pagestate}"`} </p>
                        </div>


                    </div>

                    <div className="mb-[60px] ">
                        {
                            blogs == null ? no_match() : //causing problem in other pages also
                                blogs.map((blog, i) => {
                                    return <Blogcard content={blog} author={blog.author.personal_info} />
                                })
                        }

                    </div>
                    <div className=" block md:hidden  border-b-[1px] border-b-black/50">

                    </div>

                    <div  className="block md:hidden mt-[30px]">
                        <div className="flex border-b-4 mb-[40px]">

                            <div className="w-full mt-[10px]">
                                <p className="relative left-[00px] mb-[20px]  text-3xl capitalize">Accounts </p>
                            </div>


                        </div>
                        {
                            userinfo == null ? no_match() : //causing problem in other pages also
                                userinfo.map((blog, i) => {
                                    return <Usercard user={blog} />
                                })
                        }
                    </div>



                </div>


                {/* Accounts     */}
                <div className=" border-l-[5px] border-grey pl-8 pt-3 min-w-[40%] lg:min-w-[401px] max-w-min max-md:hidden">

                    <div className="flex border-b-4 mb-[40px]">

                        <div className="w-full mt-[10px]">
                            <p className="relative left-[00px] mb-[20px]  text-3xl capitalize">Accounts </p>
                        </div>


                    </div>
                    {
                        userinfo == null ? no_match() : //causing problem in other pages also
                            userinfo.map((blog, i) => {
                                return <Usercard user={blog} />
                            })
                    }
                </div>

            </section>

        </>
    )
};

export default home;
