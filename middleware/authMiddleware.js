const { getUser } = require("../services/auth");

//login auth middleware ---> fxnality only available to loggedin users
async function restrictToLoggedinUserOnly(req,res,next){

    const userUid = req.cookies?.uid;

    //validations
    if(!userUid){
        return res.redirect("/login");
    }

    const user = await getUser(userUid);

    if(!user){
        return res.redirect("/login");
    }
    //all well
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly
}