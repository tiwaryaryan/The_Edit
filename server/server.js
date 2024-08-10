import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import jwt from 'jsonwebtoken';   //jwt token for authorisation
import cors from 'cors';
import { nanoid } from 'nanoid';
const { ObjectId } = mongoose.Types;

import user from './Schema/User.js'
import blog from './Schema/Blog.js'
import notification from './Schema/Notification.js';

const app = express();


let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex (format)for email

//connecting to cloud
mongoose.connect(process.env.MONGODB, {
    autoIndex: true
}).then(() => {
    console.log("connected to database")
})
    .catch((err) => {
        console.log(err.message);
    });


//middleweare
//(seanding as header (Bearer))
const verifyJWT = (req, res, next) => {

    const authheader = req.headers['authorization'];
    const token = authheader && authheader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ error: "No access token" })
    }

    jwt.verify(token, process.env.PRIVATE_ACCESS, (err, user) => {
        if (err) {
            return res.status(401).json({ error: "Invalid access token" })
        }

        req.user = user.id;
        next();
    })
}


//data to be sent to frontend
const datatosend = (user) => {

    const access_token = jwt.sign({ id: user._id }, process.env.PRIVATE_ACCESS)
    //                      data to be converted , private key
    return {

        access_token,
        profile_img: user.personal_info.profile_img,
        name: user.personal_info.name,
        username: user.personal_info.username,
    }
}



app.use(express.json()); //to enable json method
app.use(cors());         //for accessing data from different ports



//signup
app.post("/signup", (req, res) => {

    //res.json(req.body);
    let { name, email, password } = req.body;
    let username = email.split("@")[0];

    if (name.length < 3) {
        //     return toast.error( "Kafi chota nam hh apka 🚬")
        return res.status(403).json({ "error": "Kafi chota nam hh apka 🚬" })
    }

    //if email doesnt matches the patter then
    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email is invalid" })
    }

    if (password.length < 7) {
        return res.status(403).json({ "error": "Kripya 6 character se barda password likhe 🐥" })
    }


    //inserting data into User database
    let new_user = new user({
        personal_info: { name, email, password, username }
    });


    new_user.save()
        .then((pp) => {
            return res.status(200).json(datatosend(pp));
        })
        .catch((err) => {

            if (err.code === 11000) {  //403 code is for forbidden data 

                return res.status(500).json({ "error": "Email already exist" });
            }
            return res.status(403).json({ "error": err.message });
        })

});


//login
app.post("/login", (req, res) => {

    let { email, password } = req.body;

    if (!emailRegex.test(email)) {
        return res.status(403).json({ "error": "Email is invalid" })
    }

    //searching in database
    user.findOne({ "personal_info.email": email })
        //pp returns the whole data from User database
        .then((pp) => {
            //if user doesnt exist
            if (!pp) {
                return res.status(403).json({ "error": "Email not found" });
            }
            // console.log(pp);

            if (password != pp.personal_info.password) {
                return res.status(403).json({ "error": "Galat password 🤡" });
            }

            else {
                return res.status(200).json(datatosend(pp));
            }

        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ "error": err.message });
        })
});



//create post
app.post("/create-blog", verifyJWT, (req, res) => {
    //creating a middle weare to see authorized user in going to this page

    // return res.json(req.body);

    let authorId = req.user;

    let { title, des, banner, tags ,id } = req.body; //id is added when edit option is clicked

    if (!title.length) {
        return res.status(403).json({ error: "No Title" })
    }

    if (!banner.length) {
        return res.status(403).json({ error: "No Banner" })
    }

    if (!des.length) {
        return res.status(403).json({ error: "No description" })
    }

    if (!tags.length || tags.length > 6) {
        return res.status(403).json({ error: "Provide tags but in limit" })
    }


    tags = tags.map(tag => tag.toLowerCase());


    let blogId = id || title + nanoid();
    

    if(id){
        console.log("id: " , id);
        let blog_id = id;
        blog.findOneAndUpdate({ blog_id} , { title, des, banner, tags})
        .then(blog => {
            console.log("banner-server" , banner)
            return res.status(200).json({ id: blog.blog_id });
        })
        .catch(err => {
            console.log("error-server:" , blog);
            return res.status(500).json( err.message);

        })
    }
    else{

    let new_blog = new blog({
        title, des, banner: banner[0], tags, authorId, blog_id: blogId, author: authorId
    })

    let inci = 1;

    new_blog.save()
        .then(blog => {                                                                                          //this i sthe actual id not what we generated , it is generated by mongo db 
            user.findOneAndUpdate({ _id: authorId }, { $inc: { "account_info.total_posts": 1 }, $push: { "blogs": blog._id } })
                //increasing the total post
                .then(user => {
                    return res.status(200).json({ id: blog.blog_id });//original id ,not what we created

                })
                .catch(err => {
                    return res.status(500).json({ error: "failed to update post" });
                })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        })

    }


    //return res.json (  authorId);
});


//find and posting blog
app.get("/home-blog", (req, res) => {

    blog.find()
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
        .sort({ "publishedAt": -1 })
        .select("blog_id title des banner activity tags publishedAt -_id")
        .then(blogs => {
            return res.status(200).json({ blogs })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
});


//trending-page
app.get("/trending-blog", (req, res) => {

    blog.find()
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
        .sort({ "activity.total_read": -1, "activity.total_likes": -1, "publishedAt": -1 })
        .select("blog_id title tags publishedAt -_id")
        .limit(5)
        .then(blogs => {
            return res.status(200).json({ blogs })
        })
        .catch(err => {
            return res.status(500).json({ error: err.message })
        })
});



//search-blog
//tags-card
app.post("/trend-card", (req, res) => {
    let { tag, query } = req.body;

    let findQuery;
    //console.log(tag);

    if (tag) {
        findQuery = { tags: tag };
    }
    else if (query) {
        findQuery = { title: new RegExp(query, 'i') }
    }

    //console.log(tag)

    let maxLimit = 5;

    blog.find(findQuery)
        .populate("author", "personal_info.profile_img personal_info.username personal_info.fullname -_id")
        .sort({ "publishedAt": -1 })
        .select("blog_id title des banner activity tags publishedAt -_id")
        //   .limit(maxLimit)
        .then(blogs => {
            //console.log(blogs);
            return res.status(200).json({ blogs });

        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
});




//user_search - 
//can be used in seach blog , but we will not get all the personal info of user as it is in user schema
app.post("/search-user", (req, res) => {
    let { query } = req.body;

    user.find({ "personal_info.username": new RegExp(query, 'i') })  //for searching for every letter presemt in title
        .limit(50)
        .select("personal_info.name personal_info.username personal_info.profile_img -_id")
        .then(users => {
            return res.status(200).json({ users });
        })
        .catch(err => {
            return res.status(500).json({ error: err.message });
        });
});



app.post("/get-profile" ,(req, res) => {
    let { username } = req.body;
        user.findOne({ "personal_info.username": username }).select("-personal_info.password -google_auth -updateAt -blogs")
        .then(user => {

            return res.status(200).json(user)
        })
        .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err.message })

    })

});


let tt; //this tt for deleteing (fat rakha tha last me aise hi hua)

app.post("/get-blog", (req, res) => {

    let { blog_id , mode}= req.body;
    //console.log({ blog_id});
    tt=blog_id;
   // console.log("tt: " , tt)

    let incval = mode != "edit" ? 1 : 0;

    blog.findOneAndUpdate({ blog_id }, { $inc: {"activity.total_reads": incval} })
    .populate("author", "personal_info.name personal_info.username personal_info.profile_img")
    .select("title des banner activity publishedAt blog_id tags")
    .then(blog => {

        if (!blog) {
            console.error("No blog found with blog_id:", blog_id);
            return res.status(404).json({ error: "Blog not found" });
        }

       // console.log("blog:", blog);

        user.findOneAndUpdate({ "personal_info.username": blog.author.personal_info.username}, {
            $inc: { "account_info.total_reads": incval}
          })
          .catch(err => res.status(500).json({ error: err.message }))
          

        return res.status(200).json({ blog });

    })
    .catch(err => {
        console.log("get blog error")
        return res.status(500).json({error: err.message});

    })

});




// app.delete("/delete-blog", verifyJWT, (req, res) => {
//     // let authorId = req.user;
//     // console.log(authorId);
//     console.log("request coming");
//     let { blog_id } = req.body;
//     console.log({blog_id});
//     let id = blog_id;
//     console.log(id)

//     blog.findOneAndDelete(blog_id)
//     .then(() => {
//         console.log("deleted");
//         return res.status(200).json({ message : "done" });
//     })  
//     .catch((err) => {
//         return res.status(500).json({ error: err.message });
//     }) 

//     // const deletetask = async (blog_id) => {
//     //     try {
//     //         const task = blog.findOneAndDelete(blog_id)
//     //         console.log(task);
//     //         if(!task){
//     //             return res.status(400).json({ error: "No task provided" });
//     //         }
//     //         console.log("deleted");
//     //         return res.status(200).json({ message : "done" });
//     //     }
//     //     catch (err){
//     //         return res.status(500).json({ error: err.message });
//     //     }
//     // }

//     // deletetask();

//     // if (!blog_id) {
//     //     return res.status(400).json({ error: "No blog ID provided" });
//     // }

//     // blog.findOneAndDelete({ blog_id, authorId })
//     //     .then(deletedBlog => {
//     //         if (!deletedBlog) {
//     //             return res.status(404).json({ error: "Blog not found or not authorized" });
//     //         }

//         //     user.findOneAndUpdate(
//         //         { _id: authorId },
//         //         { $pull: { blogs: deletedBlog._id }, $inc: { "account_info.total_posts": -1 } }
//         //     )
//         //         .then(() => {
//         //             return res.status(200).json({ message: "Blog deleted successfully" });
//         //         })
//         //         .catch(err => {
//         //             return res.status(500).json({ error: "Failed to update user post count" });
//         //         });
//         // })
//     //     .catch(err => {
//     //         return res.status(500).json({ error: err.message });
//     //     });
// });

app.delete("/delete-blog", (req, res) => {

    blog.findOneAndDelete({ blog_id: tt})
        .then((result) => {
            if (result) {
                res.status(200).json({ message: "Blog deleted successfully" });
            } else {
               
                res.status(404).json({ error: "Blog not found or you're not authorized to delete it" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});



// app.post("/like-blog" , verifyJWT , (req , res) => {


    

//     let {_id , islike} = req.body;

//     let inci = !islike ? 1: -1;

//     blog.findOneAndUpdate({ _id} , {$inci: {"activity.total_likes" : inci}})
//     .then( blog => {

//         res.status(200).json({ message: "updated like" });
//     })
//     .catch(err => {
//         res.status(500).json({ error: err.message });
//     })


// });


app.post("/like-blog", verifyJWT, (req, res) => {
    let user_id = req.user;
    let { _id, islike } = req.body;
    // let user_id = ObjectId(req.user); // Convert to ObjectId
    // let { _id, islike } = req.body;
    let inci = islike ? 1 : -1;
   //console.log("ok1");

   //console.log("user_id:", user_id); // Log user_id
    //console.log("_id (blog ID):", _id); // Log blog ID
    console.log(typeof(user_id));
    console.log(typeof(_id));
    blog.findOneAndUpdate(
        { _id },
        { $inc: { "activity.total_likes": inci } },
        { new: true }
    )
    .then(blog => {

        if(islike){
            //console.log("ok2");
            //console.log(  user_id  );
            let like = new notification({
                blog: _id, notification_for: blog.author, user: user_id
            })
            
            like.save()
            .then(data => {
                //console.log("ok");
                return res.status(200).json({liked_by_user: true});
            })
            .catch(err => {
                console.log(console.log(err.message));
            })
        }

        else{

            notification.findOneAndDelete({ blog: _id , user: user_id })
            .then(data => {
                console.log("Deleted notification:", data);
                return res.status(200).json({liked_by_user: false});
            })
            .catch(err => {
                return res.status(500).json({error: err.message});
            })

        }
        //res.status(200).json({ message: "updated like", total_likes: blog.activity.total_likes });
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});


app.post("/isliked-by-user", verifyJWT, (req, res) => {


    console.log("liked by user working");
    let user_id = req.user;
  
    let { _id } = req.body;
  
    notification.exists({ blog: _id  , user: user_id })
      .then(result => {
        return res.status(200).json({ result })
      })
      .catch(err => {
        return res.status(500).json({ error: err.message })
      })
});




app.listen(3000, () => {
    console.log("listening");
});

