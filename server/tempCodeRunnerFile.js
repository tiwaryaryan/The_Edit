let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex (format)for email

//connecting to cloud
mongoose.connect(process.env.MONGODB , {
    autoIndex: true
});


//data to be sent to frontend
const datatosend = (user) =>{

    const access_token = jwt.sign({id: user._id} , process.env.PRIVATE_ACCESS)
    //                      data to be converted , private key
    return {

        access_token, 
        profile_img : user.personal_info.profile_img,
        name : user.personal_info.name,
        username : user.personal_info.username,
    }
}




app.post("/signup" , (req , res) =>{

    //res.json(req.body);
    let {name , email , password} = req.body;
    let username = email.split("@")[0];

    if(name.length <3){
        return res.status(403).json({"error": "Kafi chota nam hh apka"})
    }

    //if email doesnt matches the patter then
    if(!emailRegex.test(email)){
        return res.status(403).json({"error": "Email is invalid"})
    }

    if(password.length <7){
        return res.status(403).json({"error": "Kripya 6 character se barda password likhe"})
    }

    
    //inserting data into User database
    let new_user = new user({
        personal_info: {name , email , password , username}
    });


    new_user.save().then((pp)=>{
        return res.status(200).json(datatosend(pp));
    })
    .catch((err) => {
        return res.status(403).json({"error": err.message});
    })
   
});


//login
app.post("/login" , (req , res) =>{

    let {email , password}=req.body;

    //searching in database
    user.findOne({"personal_info.email": email})
    //pp returns the whole data from User database
    .then((pp)=>{
        //if user doesnt exist
        if(!pp){
            return res.status(403).json({"error": "Email not found"});
        }
        // console.log(pp);

        if(password != pp.personal_info.password){
            return res.status(403).json({"error": "Wrong password"});
        }

        else{
            return res.status(200).json(datatosend(pp));
        }
        
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).json({"error": err.message});
    })
});