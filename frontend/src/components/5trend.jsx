
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
import Trendtags from './extra/5home/trendtags.jsx';


const trend = () => {

    // let [blogs, setBlogs] = useState(null);
    let [trendblogs, settrendBlogs] = useState(null);
    // let [pagestate, setpagestate] = useState("Home")
    // let categories = ["fun", "kashmir"];


    // const homeblog = () => {
    //     axios.get("http://localhost:3000/home-blog")
    //         .then(({ data }) => {
    //             //console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
    //             setBlogs(data.blogs)
    //         })
    //         .catch(err => {
    //             console.log(err.message);
    //         })
    // }

    const trendingblog = () => {
        axios.get("http://localhost:3000/trending-blog")
            .then(({ data }) => {
                //console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
                settrendBlogs(data.blogs)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    // const loadtags = (e) => {
    //     console.log("click");
    //     let category = e.target.innerText.toLowerCase();
    //     setBlogs(null);

    //     if (pagestate == category) {
    //         setpagestate("Home");
    //         return;
    //     }

    //     setpagestate(category);
    // }

    const fetchtagblogs = () =>{

        axios.post("http://localhost:3000/trend-card" , {tag: pagestate})
            .then(({ data }) => {
                //console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
                setBlogs(data.blogs)
            })
            .catch(err => {
                console.log(err.message);
            })

    }



    useEffect(() => {
        // if (pagestate == "Home") {
        //     homeblog();
        // }
        // else{
        //     fetchtagblogs();
        // }

        
            trendingblog();
        

    }, []) //this means whenever there is change in page state dont call ues effect







    return (
        <>

            <Nav />

            <section className="h-cover flex justify-center gap-10">

                {/* blog cards */}
                <div className="w-full mt-[20px] ">

                    <div className="flex border-b-4 mb-[40px]">


                        <Link to="/">
                        <div className="w-full">
                            <p className="relative left-[00px] mb-[20px] text-3xl capitalize  text-black/50 hover:text-black hover:cursor-pointer">Home </p>
                        </div>
                        </Link>

                        <Link to="/trending" className="w-full md:hidden">
                        <div className="w-full md:hidden">
                            <p className="absolute left-[200px] mb-[20px] text-3xl text-black">Trending </p>
                        </div>
                        </Link>

                    </div>

                    <>
                        {/* {
                            blogs == null ? console.log("ok blogcard") : //causing problem in other pages also
                                blogs.map((blog, i) => {
                                    return <Blogcard content={blog} author={blog.author.personal_info} />
                                })
                        } */}

                        {
                            trendblogs == null ? console.log("ok trendcard") :
                                trendblogs.map((blog, i) => {
                                    return <Trendcard content={blog} index={i} />
                                })
                        }

                    </>



                </div>

            </section>

        </>
    )

}    

export default trend;