import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const search = () => {

    return (

        <>
            <button className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center" onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}>
                    <i className="fi fi-rr-search text-xl"></i>
            </button>
        </>
    )
}

export default search;