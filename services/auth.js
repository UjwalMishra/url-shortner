const jwt = require("jsonwebtoken");
//secret key
const secretKey = "ujwal$Mishra$2727";
//stateless-login
//this fxn will create tokens for me
function setUser(user) {
    const payload = {
        _id : user._id,
        email : user.email
    }
    return jwt.sign(payload,secretKey);
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secretKey);
}

module.exports = {
    setUser,
    getUser
};