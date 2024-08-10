import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Nav from './3navbar.jsx';
import { Link, Navigate, useParams , useNavigate } from "react-router-dom";
import { usercontext } from '../App';
import { useContext } from 'react';
import { getFullDay } from './extra/5home/date.jsx';
import { Button } from "@chakra-ui/react";
// import Bloginteract from './extra/8showblog/show.jsx'; //not working i dont know why
//import Bloginteract from './8show.jsx';
import { Toaster , toast } from "react-hot-toast";


export const Blogcontext = createContext({});

export const blogStructure = {

    activity: {
    },
    title: "",
    des: "",
    tags: [],
    author: {
        personal_info: {
            //   fullname: "",
            //   username: "",
            //   profile_img: "",
        },
    },
    banner: "",
    publishedAt: "",
};



const BlogPage = () => {

    let { blog_id } = useParams();
    console.log(blog_id);
    const navigate = useNavigate();
    const [blog, setBlog] = useState(blogStructure);
    const [islike , setislike] = useState(false);

    let { _id , title, des, banner, author: { personal_info: { name, username: author_username, profile_img } }, activity: { total_comments, total_likes, total_reads }, publishedAt } = blog;

    let { userAuth: { username , access_token } } = useContext(usercontext);  //this is impt for access_token if using 
    


    const fetchBlog = () => {

        axios.post("http://localhost:3000/get-blog", { blog_id })
            .then(({ data: { blog } }) => {
                //console.log({ blog });
                setBlog(blog);
            })
            .catch(err => {
                console.log(err);
            })
    };

    // const deleteBlog = () => {
    //     axios.delete('http://localhost:3000/delete-blog', { 
    //         headers: {
    //             'Authorization': `Bearer ${access_token}`
    //         },
    //         data: { blog_id }
    //     })
    //         .then(() => {
    //             //toast.success("Hogya Delete");
    //             setTimeout(() => {
    //                 navigate("/");
    //             }, 300);
    //         })
    //         .catch(({ err }) => {
    //             //toast.error(response.data.error); // Error coming from server
    //             console.log(err)
    //         });

    //     console.log("delete");
    // };

    const deleteBlog = (blog_id) => {
        axios.delete("http://localhost:3000/delete-blog" , {blog_id})
        .then(({ data }) => {
            //toast.success("Deleted successfully!");
            navigate("/");
        })
        .catch(({ response }) => {
            toast.error(response.data.error);
            console.log(response);
        });
    };



    useEffect(() => {
        console.log("oii");
        fetchBlog();
        
        if (access_token) {
            console.log("hehe");
            axios.post("http://localhost:3000/isliked-by-user", { _id }, {
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
            })
              .then(({ data: { result } }) => {
                console.log(result);
                setislike(Boolean(result))
              })
              .catch(err => {
                console.log(err);
              })
          }
    }, []);

    //console.log(blog.activity.total_likes);

    // const handle_like = () => {

    //     if(access_token){
    //         console.log("liked");
    //         setislike(preval => !preval)
    //         !islike ? total_likes++ : total_likes--;

    //         setBlog(blog.activity.total_likes)

    //     }
    //     else{
    //         toast.error("pls log in to like the blog");
    //     }
    // }

    const handle_like = () => {
        if (access_token) {
            console.log("liked");
            
            setislike(prevIsLike => {
                const newIsLike = !prevIsLike;
                const newTotalLikes = newIsLike ? blog.activity.total_likes + 1 : blog.activity.total_likes - 1;
    
                setBlog(prevBlog => ({
                    ...prevBlog,
                    activity: {
                        ...prevBlog.activity,
                        total_likes: newTotalLikes
                    }
                }));

                axios.post("http://localhost:3000/like-blog", {
                    _id, islike: newIsLike
                }, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                })
                .then(({ data }) => {
                    //console.log(data);
                })
                .catch(err => {
                    console.error(err);
                });
                
                return newIsLike;
            });
        } else {
            toast.error("Please log in to like the blog");
        }
    };
    


    return (

       

        <>  

        <Toaster/>


            <Nav />

            <Blogcontext.Provider value={{ blog, setBlog }}>

                <div className="max-w-[900px] center py-10 max-lg:px-[5vw]  ">

                    <img src={banner} className="aspect-video" />


                    <div className="flex justify-between my-8">
                        <div className="flex gap-5 items-start">
                            <img src={profile_img} className="w-12 h-12 rounded-full" />
                            <p className="capitalize">
                                {name}
                                <br />
                                @
                                <Link to={`/user/${author_username}`} className="underline">
                                    {author_username}
                                </Link>
                            </p>
                        </div>
                        <div>
                            <p className="">Published on {getFullDay(publishedAt)}</p>
                            <div className="relative top-[60px] right-[-50px]">
                            </div>

                            <div className="flex gap-[30px] mt-[10px]">
                                {

                                    username == author_username ?
                                        <Link to={`/editor/${blog_id}`} className="text-2xl underline-offset-2 hover:text-purple">
                                            Edit
                                        </Link> : ""
                                }

                                {

                                    username == author_username ?
                                    //never use deleteBlog() it will call imeediately without clicking on it
                                       <button className="mt-[3px]"  onClick={deleteBlog}>  
                                        <i className="fi fi-rr-trash  text-2xl  hover:text-red hover:text-[22px]"></i>
                                       </button> : ""
                                }
                            </div>
                        </div>


                    </div>

                    <div className="mt-12">
                        <h2>{title}</h2>
                    </div>

                    <div className="mt-[10px] text-xl">
                        {des}
                    </div>

                    {/* <Bloginteract/> */}

                    <div className="flex pb-[30px] mt-[20px]">
                        <hr className="border-grey my-2" />
                        <div className="flex gap-6">

                            {/* like */}
                            <div className="flex gap-3 items-center">
                                <button 
                                onClick={handle_like}
                                className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80" >
                                    {(islike? <i className="fi fi-sr-heart text-red" ></i>  : <i className="fi fi-rr-heart bg-grey/50" ></i>)}
                                    
                                </button>
                                <p>{total_likes}</p>
                            </div>
                        </div>


                        {/* comments */}
                        {/* <div className="flex gap-6">
                            <hr className="border-grey my-2" />
                            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 ">
                                <i className="fi fi-rr-comment-dots"></i>
                            </button>
                            <p className="text-xl text-dark-grey relative top-[5px] left-[-5px]">
                                {total_comments}
                            </p>
                        </div> */}

                    </div>

                    <div className="max-w-[900px] flex flex-col center py-10 max-lg:px-[5vw] border-t-[2px] border-t-black/20 ">


                    </div>

                </div >

            </Blogcontext.Provider>
        </>
    )
};

export default BlogPage;
