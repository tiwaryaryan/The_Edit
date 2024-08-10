import { useState } from "react";
import { Link, Navigate } from "react-router-dom";




const searchbox = () => {

    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

    return (

        <>
            <div className={"absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " + (searchBoxVisibility ? "block" : "hidden")}>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                />
                <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
            </div>
        </>
    )
}

export default searchbox;