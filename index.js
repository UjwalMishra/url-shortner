const express = require("express");
const cookieParser = require("cookie-parser");
const {restrictToLoggedinUserOnly} = require("./middleware/authMiddleware");

const dbConnect = require("./config/dbConnection");
const path = require("path");

//routes-import
const urlRoute = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/userRoutes");

const app = express();


const PORT = 3000;

//midlleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//setting up ejs template engine
app.set("view engine","ejs");
//setting path for views --> part of ejs setup
app.set("views", path.join(__dirname, "views"));

//db connection
dbConnect("mongodb://localhost:27017/urlShortner");

//routes --> /url
app.use("/url",restrictToLoggedinUserOnly,urlRoute);

// routes--> staticRoutes i.e for frontend ejs routes
app.use("/",staticRoute);

//route--> for user
app.use("/user",userRoute);

app.listen(PORT,()=> console.log(`Server started at ${PORT}`));
