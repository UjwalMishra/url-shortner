const User = require("../models/users");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../services/auth");

//creating users
async function userSignupController(req,res) {
    const {name,email,password} = req.body;
    //perform validations by yourself here ---> task
    await User.create({
        name,
        email,
        password
    });
    return res.render("generateShortUrl");
};

//login user
async function userLoginController(req,res) {
    const {email,password} = req.body;  
    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login",{
            error: "Invalid Username or Password"
        }); 
    }

    // stateless login
    const token = setUser(user);
    //generate a cookie in res
    res.cookie("uid",token);
    return res.redirect("/home");

    //try login using stateless --> using jwt
};


module.exports = {
    userSignupController,
    userLoginController
}