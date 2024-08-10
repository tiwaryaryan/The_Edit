import axios from "axios";
import { useEffect, useState } from "react";
import { useParams  , Link} from "react-router-dom";
import Nav from './3navbar.jsx';
import { usercontext } from '../App';
import { useContext } from 'react';
import {getFullDay} from './extra/5home/date.jsx';
import Aboutuser from './extra/7profile/aboutuser.jsx';


export const profileDataStructure = {
    personal_info: {
        fullname: "",
        username: "",
        profile_img: "",
        bio: "",
    },
    account_info: {
        total_posts: 0,
        total_reads: 0,
    },
    social_links: {},
    joinedAt: " ",
};


const profile = () => {


    let { id: profileId } = useParams();
    //console.log(profileId);
    let [profile, setProfile] = useState(profileDataStructure); //not using null beacuse it wont work here
    let { personal_info: { name, username: profile_username, profile_img, bio }, account_info: { total_posts, total_reads }, social_links, joinedAt } = profile;


    let {userAuth: {username}} = useContext(usercontext); //this is giving the username of logedin profile

    const fetchUserProfile = () => {
        axios.post("http://localhost:3000/get-profile", { username: profileId })
            .then(({ data: user }) => {
                console.log(user);
                setProfile(user);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const reset = () => {
        setProfile(profileDataStructure);
    }

    useEffect(() => {

        
        fetchUserProfile();
    }, [profileId]);




    return (

        <>

        <Nav/>

        <section className="h-cover flex justify-center md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12 mt-[20px]">

            <div className="flex flex-col max-md:items-center gap-5 min-w-[250px]">

                <img src={profile_img} className= "w-48 h-48 bg-grey rounded-full md:w-32 md:h-32" />

                <h1 className="text-2xl font-medium">@
                    {profile_username}
                </h1>

                <p className="text-xl capitalize h-6">{name}</p>

                <p>{total_posts.toLocaleString()} Blogs - {total_reads.toLocaleString()} Reads</p>

                <div className="flex gap-4 mt-2">

                    {/* {
                        profileId == username ? <Link to="/settings/edit-profile" className="btn-light rounded-md">
                        Edit Profile
                    </Link> 
                    : " "
                    } */}

                    
                </div>

                <Aboutuser bio={bio} social_links={social_links} joinedAt={joinedAt}/>

            </div>
        </section>
        </>
    )
}


export default profile;


