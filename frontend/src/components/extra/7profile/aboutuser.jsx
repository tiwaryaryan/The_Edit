import { Link } from "react-router-dom";
import { getFullDay } from './date.jsx';

const AboutUser = ({ className, bio, social_links, joinedAt }) => (

    <div className={className}>
        <p className="text-xl leading-7">{bio.length ? bio : ""}</p>
        <p className="text-xl">Joined on  {getFullDay(joinedAt)}</p>

        <div className="flex gap-x-7 gap-y-2 flex-wrap my-7 items-center text-dark-grey">
            {Object.keys(social_links).map((key) => {
                let link = social_links[key];

                return link ? (
                    <Link to={link} key={key} target="_blank">
                        <i
                            className={[
                                "fi",
                                key === "website" ? "fi-brands-" + key : "fi-rr-globe",
                                "text-2xl hover:text-black",
                            ]}
                        ></i>
                    </Link>
                ) : ("");
            })}

        </div>

        
    </div>
);

export default AboutUser;
