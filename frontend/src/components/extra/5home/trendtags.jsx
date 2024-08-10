import React from 'react';
import { Link } from 'react-router-dom';

const trendcard = ({content }) =>{
    
    
    let {   tags, blog_id: id } = content;

return (
        
        <div className="flex gap-2 mt-7">
                    {/* <span className="btn-light py-1 px-4">
                        {/* {tags.map((tag, i) => { return tags[i] })} *}
                        {tags[0]}
                    </span> */}

                    {tags.map((tag ,i) => {
                         return (
                            <span className="btn-light py-1 px-4">
                                {tags[0]}
                         </span>
                         )
                         }
                    )}
        </div>
    
);
}

export default trendcard;