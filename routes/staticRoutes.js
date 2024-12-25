const express = require("express");
const URL = require("../models/urlModel");

const router = express.Router();


//route to get all the url data on frontend
router.get("/home",async(req,res)=>{
    const allUrl = await URL.find({});
    return res.render("home",{allUrl});
});

//generate url --> frontend
router.get("/generateShortUrl",(req,res)=>{
    res.render("generateShortUrl");
});

//signup url ---> frontend
router.get("/signup",(req,res)=>{
    return res.render("signup");
});

//login ---> frontend
router.get("/login",(req,res)=>{
    return res.render("login");
});

module.exports = router;