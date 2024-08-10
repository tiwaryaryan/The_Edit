// import { useContext } from "react";
// import { BlogContext } from "../../8showblog.jsx";


// const BlogInteraction = () => {


//     let { blog: { blog_id, activity, activity: { total_likes }, author: { personal_info: { username: author_username } } }, setBlog } = useContext(BlogContext);


//     return (

//         <>
//             <hr className="border-grey my-2" />
//             <div className="flex gap-6">
//                 <div className="flex gap-3 items-center">
//                     <button
//                         className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80"
//                     >
//                         <i className="fi fi-rr-heart"></i>
//                     </button>
//                     <p>{total_likes}</p>
//                 </div>
//             </div>
//             <hr className="border-grey my-2" />

//             hii
//         </>
//     )
// }

// export default BlogInteraction;


import { useContext } from "react";
//import { Blogcontext } from "../../8show.jsx";

const BlogInteraction = () => {
    let { blog: { activity: { total_likes } }, setBlog } = useContext(Blogcontext);

    return (
        <>
            <hr className="border-grey my-2" />
            <div className="flex gap-6">
                <div className="flex gap-3 items-center">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80">
                        <i className="fi fi-rr-heart"></i>
                    </button>
                    <p>{total_likes}</p>
                </div>
            </div>
            <hr className="border-grey my-2" />
        </>
    );
};

export default BlogInteraction;
