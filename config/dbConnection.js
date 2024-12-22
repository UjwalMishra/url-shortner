const mongoose = require("mongoose");

async function dbConnect(url){
    return mongoose.connect(url)
            .then(()=>console.log("Db connected successfully"))
            .catch((err)=>console.log("Error while connecting to db",err));
}

module.exports = dbConnect;