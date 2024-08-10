import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import Nav from './3navbar.jsx';
import photo from './imgs/blog banner.png';
import Tag from './extra/4write/tags.jsx';
import Publish from './extra/4write/publish.jsx';
import app from '../firebase.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { usercontext } from '../App';

const Write = () => {
    const navigate = useNavigate();
    const { blog_id } = useParams();
    const [blogStructure, setBlogStructure] = useState({
        title: '',
        banner: '',
        tags: [],
        des: '',
        author: { personal_info: {} }
    });
    const [imagefileurl, setImagefileurl] = useState(null);
    const { userAuth } = useContext(usercontext);
    const access_token = userAuth ? userAuth.access_token : null;

    useEffect(() => {
        if (blog_id) {
            fetchBlog();
        }
    }, [blog_id]);

    const fetchBlog = () => {
        axios.post("https://the-edit.onrender.com/get-blog", { blog_id, mode: "edit" })
            .then(({ data: { blog } }) => {
                setBlogStructure(blog);
                setImagefileurl(blog.banner); // Set the existing banner URL
            })
            .catch(err => {
                console.log(err);
            });
    };

    const blog_server = (blogStructure) => {
        let loadtoast = toast.loading("Uploading...");
        axios.post('https://the-edit.onrender.com/create-blog', { ...blogStructure, id: blog_id }, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(({ data }) => {
                toast.dismiss(loadtoast);
                toast.success("Published successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 600);
            })
            .catch(({ response }) => {
                toast.dismiss(loadtoast);
                toast.error(response.data.error); // Error coming from server
            });
    };

    const photoUpload = async (evt) => {
        const file = evt.target.files[0];
        if (file) {
            let loadtoast = toast.loading("Uploading...");
            try {
                const storage = getStorage(app);
                const fileName = new Date().getDate() + new Date().getTime() + file.name;
                const storageref = ref(storage, "images/" + fileName);
                await uploadBytes(storageref, file);
                const downloadURL = await getDownloadURL(storageref);
                setImagefileurl(downloadURL);
                setBlogStructure((prev) => ({
                    ...prev,
                    banner: downloadURL
                }));
                toast.dismiss(loadtoast);
                toast.success("Uploaded successfully!");
            } catch (error) {
                console.log(error);
                toast.dismiss(loadtoast);
                toast.error("Failed to upload image");
            }
        }
    };

    const handleTitleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    };

    const handleTitleChange = (e) => {
        let i = e.target;
        i.style.height = i.scrollHeight + "px";
        const { name, value } = e.target;
        setBlogStructure((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handlekeydown = (e) => {
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.preventDefault();
            let tag = e.target.value.trim();
            if (tag && !blogStructure.tags.includes(tag)) {
                setBlogStructure((prev) => ({
                    ...prev,
                    tags: [...prev.tags, tag]
                }));
                e.target.value = '';
            }
        }
    };

    const removeTag = (indexToRemove) => {
        setBlogStructure((prev) => ({
            ...prev,
            tags: prev.tags.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handle_submit = (evt) => {
        evt.preventDefault();
        if (access_token) {
            blog_server(blogStructure);
        } else {
            toast.error("Access token is missing. Please log in.");
        }
    };

    return (
        <>
            <Toaster />
            <Nav />
            <section className="mx-auto max-w-[900px] w-full">
                <div className="relative mx-auto max-h-[300px] aspect-video hover:opacity-80 bg-white border-4 border-grey">
                    <label htmlFor="uploadBanner">
                        <img src={imagefileurl || photo} alt="Default Banner" className='2z' />
                        <input
                            id="uploadBanner"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={photoUpload}
                        />
                    </label>
                </div>
                <form onSubmit={handle_submit} action="">
                    <textarea
                        name='title'
                        placeholder="Blog Title"
                        value={blogStructure.title}
                        className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder-opacity-40 bg-red-500"
                        onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}
                    />
                    <hr />
                    <textarea
                        name='des'
                        placeholder="Write your ideas here"
                        value={blogStructure.des}
                        className="text-xl w-full h-20 outline-none resize-none mt-10 leading-tight bg-red-900"
                        onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}
                    />
                    <br /><br /><hr /><br />
                    <div className="relative input-box pl-2 py-2 pb-4">
                        <input
                            name='tags'
                            type="text"
                            placeholder="Tags"
                            className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
                            onKeyDown={handlekeydown}
                        />
                        <div className="flex flex-wrap mt-2">
                            {blogStructure.tags.map((tag, index) => (
                                <Tag key={index} tag={tag} onRemove={() => removeTag(index)} />
                            ))}
                        </div>
                    </div>
                    <hr /><br />
                    <Publish />
                </form>
            </section>
        </>
    )
}

export default Write;






// import { useState ,useEffect } from 'react';
// import Nav from './3navbar.jsx';
// import photo from './imgs/blog banner.png';
// import COVER_IMAGE from './imgs/cover4.jpg';
// import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
// import { useContext } from 'react';
// import { usercontext } from '../App';
// import { Toaster, toast } from 'react-hot-toast';
// import EditorJs from "@editorjs/editorjs";
// import Tag from './extra/4write/tags.jsx';
// import Publish from './extra/4write/publish.jsx';
// import app from '../firebase.js';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
// import axios from 'axios';





// const Write = () => {









//     const navigate = useNavigate();

//     const [blogStructure, setBlogStructure] = useState({
//         title: '',
//         banner: '',
//         tags: [],
//         des: '',
//         author: { personal_info: {} }
//     });

//     const [imagefile, setImagefile] = useState(null);
//     const [imagefileurl, setImagefileurl] = useState(null);

//     let { userAuth, userAuth: { access_token, profile_img, username } } = useContext(usercontext);

//     //console.log(access_token);


//     const blog_server = (blogStructure) => {


//         let loadtoast = toast.loading("Uplaoding...");



//         axios.post('https://the-edit.onrender.com/create-blog', blogStructure, {
//             headers: {
//                 'Authorization': `Bearer ${access_token}`
//             }
//         })
//             .then(({ data }) => {
//                 //console.log("ok");
//                 //toast.dismiss(loadtoast);
//                 toast.success("Hogya Publish👍");

//                 setTimeout(() => {
//                     navigate("/");
//                 }, 600);
//             })
//             .catch(({ response }) => {
//                // toast.dismiss(loadtoast);
//                 toast.error(response.data.error); // Error coming from server
//             });


//     }


//     const photoUpload = async (evt) => {

//         const file = evt.target.files[0];
//         if (file) {

//             let loadtoast = toast.loading("Uplaoding...");

//             try {
//                 setImagefile(file);

//                 const storage = getStorage(app);
//                 const fileName = new Date().getDate() + new Date().getTime() + file.name;

//                 console.log(fileName);

//                 const storageref = ref(storage, "images/" + fileName);
//                 await uploadBytes(storageref, file);

//                 const downloadURL = await getDownloadURL(storageref);
//                 setImagefileurl(downloadURL);



//                 setBlogStructure((prev) => ({
//                     ...prev,
//                     banner: [...prev.banner, downloadURL]
//                 }));

//                 toast.dismiss(loadtoast);
//                 toast.success("Uploaded");

//             }
//             catch (error) {
//                 console.log(error);
//             }

//         }

//     };

//     //console.log(blogStructure.banner[0])


//     const handleTitleKeyDown = (e) => {
//         if (e.keycode == 13) {
//             e.preventDefault();
//         }
//     };


//     //to remove scroll bar and change height accordingly
//     const handleTitleChange = (e) => {

//         let i = e.target;
//         //console.log(i.scrollHeight);
//         i.style.height = i.scrollHeight + "px";

//         const { name, value } = e.target; // Object destructuring
//         setBlogStructure((prev) => {
//             return { ...prev, [name]: value };
//         });
//         //console.log(name , value) //- email 12345678@gmail.com password 12345678
//         //console.log(blogStructure);
//     };




//     const handlekeydown = (e) => {
//         if (e.keyCode === 13 || e.keyCode === 188) {
//             e.preventDefault();
//             let tag = e.target.value.trim();
//             if (tag && !blogStructure.tags.includes(tag)) {
//                 setBlogStructure((prev) => ({
//                     ...prev,
//                     tags: [...prev.tags, tag]
//                 }));
//                 e.target.value = ''; // clear the input field
//             }
//         }
//     }

//     const removeTag = (indexToRemove) => {
//         setBlogStructure((prev) => ({
//             ...prev,
//             tags: prev.tags.filter((_, index) => index !== indexToRemove)
//         }));
//     }


//     const handle_submit = (evt) => {
//         evt.preventDefault();
//         // if (evt.target.className.includes("disable")) {
//         //     return;
//         // }
//         //evt.target.classList.add('disable');//preventing from submiting the form twice
//         blog_server(blogStructure); // Sending request to server

//     };




    
//     //for edit
//     let { blog_id } = useParams();
    

//     const editor = () => {

//         const [blog, setBlog] = useState(blogStructure);

//         let { title, des, banner, tags} = blog;
    

//         const fetchBlog = () => {
//             axios.post("https://the-edit.onrender.com/get-blog", { blog_id, mode: "edit" })
//                 .then(({ data: { blog } }) => {
//                     //console.log({ blog });
//                     setBlog(blog);
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 })

//         }

//         useEffect(() => {
//             fetchBlog();
//         }, []);


//         console.log(blog);
    
//     }

    


//     if (blog_id) {

//         editor();
//     }







//     return (


//         //access_token ?

//         <>
//             <Toaster />
//             <Nav />


//             <section className="mx-auto max-w-[900px] w-full">
//                 <div className="relative mx-auto max-h-[300px] aspect-video hover:opacity-80 bg-white border-4 border-grey">
//                     <label htmlFor="uploadBanner">
//                         <img src={imagefileurl || photo} alt="Default Banner" className='2z' />
//                         <input
//                             id="uploadBanner"
//                             type="file"
//                             accept="image/*"
//                             hidden //to hide the option saying to choose
//                             onChange={photoUpload}
//                         />
//                     </label>
//                 </div>


//                 <form onSubmit={handle_submit} action="">

//                     <textarea
//                         name='title'
//                         placeholder="Blog Title"
//                         className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder-opacity-40 bg-red-500"
//                         onKeyDown={handleTitleKeyDown}
//                         onChange={handleTitleChange}
//                     />

//                     <hr />



//                     <textarea
//                         name='des'
//                         placeholder="Write your ideas here"
//                         className="text-xl  w-full h-20 outline-none resize-none mt-10 leading-tight bg-red-900"
//                         onKeyDown={handleTitleKeyDown}
//                         onChange={handleTitleChange}
//                     />

//                     <br /><br /><hr /><br />

//                     <div className="relative input-box pl-2 py-2 pb-4">
//                         <input
//                             name='tags'
//                             type="text"
//                             placeholder="Tags"
//                             className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
//                             onKeyDown={handlekeydown}
//                         //onChange={handleTitleChange}
//                         />

//                         {/* {blogStructure.tags.map((tag , i)=>{
//                         <Tag tag={tag} key={i} />
//                     })} */}

//                         <div className="flex flex-wrap mt-2">
//                             {blogStructure.tags.map((tag, index) => (
//                                 <Tag key={index} tag={tag} onRemove={() => removeTag(index)} />
//                             ))}
//                         </div>


//                         {/* {console.log(blogStructure.tags)} */}

//                     </div>




//                     <hr /><br />

//                     <Publish />

//                 </form>
//             </section>





//         </>

//         // : <Navigate to="/login" />
//     )
// }

// export default Write;








//.......................................








//Default write


// import { useState ,useEffect } from 'react';
// import Nav from './3navbar.jsx';
// import photo from './imgs/blog banner.png';
// import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
// import { useContext } from 'react';
// import { usercontext } from '../App';
// import { Toaster, toast } from 'react-hot-toast';
// import EditorJs from "@editorjs/editorjs";
// import Tag from './extra/4write/tags.jsx';
// import Publish from './extra/4write/publish.jsx';
// import app from '../firebase.js';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
// import axios from 'axios';



// const Write = () => {


//     let { blog_id } = useParams();
//     const navigate = useNavigate();
//     const [blogStructure, setBlogStructure] = useState({
//         title: '',
//         banner: '',
//         tags: [],
//         des: '',
//         author: { personal_info: {} }
//     });

//     const [imagefile, setImagefile] = useState(null);
//     const [imagefileurl, setImagefileurl] = useState(null);

//     let { userAuth, userAuth: { access_token, profile_img, username } } = useContext(usercontext);

//     //console.log(access_token);

//     useEffect(() => {
//         if (blog_id) {
//             fetchBlog();
//         }
//     }, [blog_id]);

//     const fetchBlog = () => {
//         axios.post("https://the-edit.onrender.com/get-blog", { blog_id, mode: "edit" })
//             .then(({ data: { blog } }) => {
//                 setBlogStructure(blog);
//                 setImagefileurl(blog.banner);
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//         }


    


//     const blog_server = (blogStructure) => {

//         let loadtoast = toast.loading("Uplaoding...");

//         axios.post('https://the-edit.onrender.com/create-blog', blogStructure, {
//             headers: {
//                 'Authorization': `Bearer ${access_token}`
//             }
//         })
//             .then(({ data }) => {
//                 //console.log("ok");
//                 toast.dismiss(loadtoast);
//                 toast.success("Hogya Publish👍");

//                 setTimeout(() => {
//                     navigate("/");
//                 }, 600);
//             })
//             .catch(({ response }) => {
//                 toast.dismiss(loadtoast);
//                 toast.error(response.data.error); // Error coming from server
//             });


//     }


//     const photoUpload = async (evt) => {

//         const file = evt.target.files[0];
//         if (file) {

//             let loadtoast = toast.loading("Uplaoding...");

//             try {
//                 setImagefile(file);

//                 const storage = getStorage(app);
//                 const fileName = new Date().getDate() + new Date().getTime() + file.name;

//                 console.log(fileName);

//                 const storageref = ref(storage, "images/" + fileName);
//                 await uploadBytes(storageref, file);

//                 const downloadURL = await getDownloadURL(storageref);
//                 setImagefileurl(downloadURL);



//                 setBlogStructure((prev) => ({
//                     ...prev,
//                     banner: [...prev.banner, downloadURL]
//                 }));

//                 toast.dismiss(loadtoast);
//                 toast.success("Uploaded");

//             }
//             catch (error) {
//                 console.log(error);
//             }

//         }

//     };

//     //console.log(blogStructure.banner[0])


//     const handleTitleKeyDown = (e) => {
//         if (e.keycode == 13) {
//             e.preventDefault();
//         }
//     };


//     //to remove scroll bar and change height accordingly
//     const handleTitleChange = (e) => {

//         let i = e.target;
//         //console.log(i.scrollHeight);
//         i.style.height = i.scrollHeight + "px";

//         const { name, value } = e.target; // Object destructuring
//         setBlogStructure((prev) => {
//             return { ...prev, [name]: value };
//         });
//         //console.log(name , value) //- email 12345678@gmail.com password 12345678
//         //console.log(blogStructure);
//     };




//     const handlekeydown = (e) => {
//         if (e.keyCode === 13 || e.keyCode === 188) {
//             e.preventDefault();
//             let tag = e.target.value.trim();
//             if (tag && !blogStructure.tags.includes(tag)) {
//                 setBlogStructure((prev) => ({
//                     ...prev,
//                     tags: [...prev.tags, tag]
//                 }));
//                 e.target.value = ''; // clear the input field
//             }
//         }
//     }

//     const removeTag = (indexToRemove) => {
//         setBlogStructure((prev) => ({
//             ...prev,
//             tags: prev.tags.filter((_, index) => index !== indexToRemove)
//         }));
//     }


//     const handle_submit = (evt) => {
//         evt.preventDefault();
//         // if (evt.target.className.includes("disable")) {
//         //     return;
//         // }
//         //evt.target.classList.add('disable');//preventing from submiting the form twice
//         blog_server(blogStructure); // Sending request to server

//     };




    
//     //for edit
    
    

//     // const editor = () => {

//     //     const [blog, setBlog] = useState(blogStructure);

//     //     let { title, des, banner, tags} = blog;
    

//     //     const fetchBlog = () => {
//     //         axios.post("https://the-edit.onrender.com/get-blog", { blog_id, mode: "edit" })
//     //             .then(({ data: { blog } }) => {
//     //                 //console.log({ blog });
//     //                 setBlog(blog);
//     //             })
//     //             .catch(err => {
//     //                 console.log(err);
//     //             })

//     //     }

//     //     // useEffect(() => {
//     //     //     fetchBlog();
//     //     // }, []);


//     //     console.log(blog);
    
//     // }

    


//     return (


//         //access_token ?

//         <>
//             <Toaster />
//             <Nav />


//             <section className="mx-auto max-w-[900px] w-full">
//                 <div className="relative mx-auto max-h-[300px] aspect-video hover:opacity-80 bg-white border-4 border-grey">
//                     <label htmlFor="uploadBanner">
//                         <img src={imagefileurl || photo} alt="Default Banner" className='2z' />
//                         <input
//                             id="uploadBanner"
//                             type="file"
//                             accept="image/*"
//                             hidden //to hide the option saying to choose
//                             onChange={photoUpload}
//                         />
//                     </label>
//                 </div>


//                 <form onSubmit={handle_submit} action="">

//                     <textarea
//                         name='title'
//                         placeholder="Blog Title"
//                         className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder-opacity-40 bg-red-500"
//                         onKeyDown={handleTitleKeyDown}
//                         onChange={handleTitleChange}
//                     />

//                     <hr />



//                     <textarea
//                         name='des'
//                         placeholder="Write your ideas here"
//                         className="text-xl  w-full h-20 outline-none resize-none mt-10 leading-tight bg-red-900"
//                         onKeyDown={handleTitleKeyDown}
//                         onChange={handleTitleChange}
//                     />

//                     <br /><br /><hr /><br />

//                     <div className="relative input-box pl-2 py-2 pb-4">
//                         <input
//                             name='tags'
//                             type="text"
//                             placeholder="Tags"
//                             className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
//                             onKeyDown={handlekeydown}
//                         //onChange={handleTitleChange}
//                         />

//                         {/* {blogStructure.tags.map((tag , i)=>{
//                         <Tag tag={tag} key={i} />
//                     })} */}

//                         <div className="flex flex-wrap mt-2">
//                             {blogStructure.tags.map((tag, index) => (
//                                 <Tag key={index} tag={tag} onRemove={() => removeTag(index)} />
//                             ))}
//                         </div>


//                         {/* {console.log(blogStructure.tags)} */}

//                     </div>




//                     <hr /><br />

//                     <Publish />

//                 </form>
//             </section>





//         </>

//         // : <Navigate to="/login" />
//     )
// }

// export default Write;