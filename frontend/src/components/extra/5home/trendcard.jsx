//original

// import React from 'react';
// import { getDay } from "./date";
// import { Link } from 'react-router-dom';

// const trendcard = ({content , index}) =>{
    
//     let { title, blog_id: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = content;
    

// return (
//     <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
//         <h1 className="blog-index text-[#21A5E5]/50">{index < 10 ? "0" + (index + 1) : index}</h1>
        
//         <div>
//             <div className="flex gap-2 items-center mb-4">
//                 <img src={profile_img} className="w-6 h-6 rounded-full" />
//                 <p className="line-clamp-1">{fullname} @ {username}</p>
//                 <p className="min-w-fit">{getDay(publishedAt)}</p>
//             </div>
            
//             <h1 className="blog-title">{title}</h1>
//         </div>
//     </Link>
// );
// }

// export default trendcard;



//2

import React from 'react';
import { getDay } from "./date";
import { Link } from 'react-router-dom';

const trendcard = ({content , index}) =>{
    
    let { title, blog_id: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = content;
    

return (
    <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
        {/* <h1 className="blog-index text-[#21A5E5]/50">{index < 10 ? "0" + (index + 1) : index}</h1> */}
        <div className='flex'> 
        <h1 className='text-3xl'>🔥</h1>
        <h1 className='text-3xl text-red font-medium'>{ (index+1)}</h1>
        </div>
        
        <div>
            <div className="flex gap-2 items-center mb-4">
                <img src={profile_img} className="w-6 h-6 rounded-full" />
                <p className="line-clamp-1">{fullname} @ {username}</p>
                <p className="min-w-fit">{getDay(publishedAt)}</p>
            </div>
            
            <h1 className="blog-title">{title}</h1>
        </div>
    </Link>
);
}

export default trendcard;