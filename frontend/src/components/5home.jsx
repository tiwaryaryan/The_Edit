// import { useState } from "react";
// import { Link , Navigate} from "react-router-dom";
// //import profile_img from './imgs/profile.jpg';
// // import Side from './extra/1nav.jsx';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import './3navbar.css';
// import { useContext } from 'react';
// import { usercontext } from '../App';
// import Nav from './3navbar.jsx';
// import axios from "axios";
// import { useEffect  } from "react";
// import { Toaster, toast } from 'react-hot-toast';
// import Blogcard from './extra/5home/blogcard.jsx'
// import Trendcard from './extra/5home/trendcard.jsx';


// const home = () =>{

//     let [blogs , setBlogs] = useState(null);
//     let [trendblogs , settrendBlogs] = useState(null);


//     const homeblog = () => {
//         axios.get("https://the-edit.onrender.com/home-blog")
//         .then(({data}) => {
//             //console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
//             setBlogs(data.blogs)
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
//     }

//     const trendingblog = () => {
//         axios.get("https://the-edit.onrender.com/trending-blog")
//         .then(({data}) => {
//             console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
//             settrendBlogs(data.blogs)
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
//     }

//     useEffect(() => {
//         homeblog();
//         trendingblog();
//     } , [])



// return (
//     <>

//     <Nav/>

//     <div className="w-full">
//             <p className="relative left-[100px]  underline underline-offset-4 text-2xl">Home </p>
//     </div>

//     <section className="h-cover flex justify-center gap-10">


//         <div className="w-full mt-[40px]">
//             <>
//             {
//                 blogs == null ? toast.loading("laoding...") :
//                 blogs.map((blog , i) => {
//                     return <Blogcard content={blog} author={blog.author.personal_info}/>
//                 })
//             }

//             </>



//         </div>

//         <div>

//             <h1 className="absolute top-[100px] z-50 px-[20px]">Treending blogs</h1>


//         {
//                 trendblogs == null ? toast.loading("laoding...") :
//                 trendblogs.map((blog , i) => {
//                     return <Trendcard content={blog} index={i}/>
//                 })
//         }

//         </div>
//     </section>

//     </>
// )
// };

// export default home;




// //2



//3
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


const home = () => {

    let [blogs, setBlogs] = useState(null);
    let [trendblogs, settrendBlogs] = useState(null);
    let [pagestate, setpagestate] = useState("Home")
    let categories = ["fun", "kashmir"];

    let { userAuth, userAuth: { access_token}, setuserAuth } = useContext(usercontext);

    const homeblog = () => {
        axios.get("https://the-edit.onrender.com/home-blog")
            .then(({ data }) => {
                //console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
                setBlogs(data.blogs)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const trendingblog = () => {
        axios.get("https://the-edit.onrender.com/trending-blog")
            .then(({ data }) => {
                //console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
                settrendBlogs(data.blogs)
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const loadtags = (e) => {
        console.log("click");
        let category = e.target.innerText.toLowerCase();
        setBlogs(null);

        if (pagestate == category) {
            setpagestate("Home");
            return;
        }

        setpagestate(category);
    }

    const fetchtagblogs = () =>{

        axios.post("https://the-edit.onrender.com/trend-card" , {tag: pagestate})
            .then(({ data }) => {
                //console.log(data.blogs);   //for getting something in . like data.blog you need to pass it in like obj {data}
                setBlogs(data.blogs)
            })
            .catch(err => {
                console.log(err.message);
            })

    }



    useEffect(() => {
        if (pagestate == "Home") {
            homeblog();
        }
        else{
            fetchtagblogs();
        }

        
            trendingblog();
        

    }, [pagestate]) //this means whenever there is change in page state dont call ues effect







    return (


        //access_token ?


        <>

            <Nav />

            <section className="h-cover flex justify-center gap-10">

                {/* blog cards */}
                <div className="w-full mt-[20px] ">

                    <div className="flex border-b-4 mb-[40px]">

                        <div className="w-full">
                            <p className="relative left-[00px] mb-[20px]  text-3xl capitalize">{pagestate} </p>
                        </div>

                        <Link to="/trending" className="w-full md:hidden">
                        <div className="w-full md:hidden">
                            <p className="absolute left-[200px] mb-[30px] text-3xl text-black/50 hover:text-black hover:cursor-pointer">Trending </p>
                        </div>
                        </Link>

                    </div>

                    <>
                        {
                            blogs == null ? console.log("ok blogcard") : //causing problem in other pages also
                                blogs.map((blog, i) => {
                                    return <Blogcard content={blog} author={blog.author.personal_info} />
                                })
                        }

                        {/* {
                            trendblogs == null ? console.log("ok trendcard") :
                                trendblogs.map((blog, i) => {
                                    return <Trendcard content={blog} index={i} />
                                })
                        } */}

                    </>



                </div>


                {/* trending cards and tags         */}
                <div className=" border-l-[5px] border-grey pl-8 pt-3 min-w-[40%] lg:min-w-[401px] max-w-min max-md:hidden">

                    {/* tags */}
                    <div className="flex flex-col gap-10 ">

                        <div className="border-b-4 ">
                            <p className="text-xl font-bold mb-5">Your interest</p>

                            <div className="flex gap-3 flex-wrap mb-[40px]">

                                {/* {
                                    categories.map((content, i) => {
                                        return (
                                            <button onClick={loadtags} className="p-3 bg-[#1eea2f]/70 rounded-full px-6 capitalize hover:border hover:font-medium " key={i}>
                                                {content}
                                            </button>
                                        )
                                    })
                                } */}

{
                                trendblogs == null ? console.log("ok trendcard") :
                                trendblogs.map((blog, i) => {
                                    let {   tags, blog_id: id  , title} = blog;
                                    //console.log(blog);
                                    //console.log("tags:", tags)
                                    return (<button onClick={loadtags} className="p-3 bg-[#1eea2f]/70 rounded-full px-6 capitalize hover:border hover:font-medium " key={i}>
                                        {tags[0]}
                                    </button>)
                                })
                        }

                            </div>


                        </div>


                        <div>

                            <h1 className="font-bold text-2xl text-red mb-8">Trending  <i className="font-bold fi fi-rr-arrow-trend-up"></i> </h1>

                            {
                                trendblogs == null ? "" :
                                    trendblogs.map((blog, i) => {
                                        return <Trendcard content={blog} index={i} />
                                    })
                            }


                        </div>

                    </div>


                </div>
            </section>

        </>

        //: <Navigate to = "/login" /> 
    )
};

export default home;
