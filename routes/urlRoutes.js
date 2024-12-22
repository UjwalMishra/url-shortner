const express = require("express");
const {shortUrlGenerator,handleAnalytics} = require("../controllers/urlController");
const URL = require("../models/urlModel");

const router = express.Router();

//route for posting a url to get its short url
router.post("/",shortUrlGenerator);

//route for using the shortUrl
router.get("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory: {
                timestamp : Date.now(),
            }
        }
    });
    res.redirect(entry.redirectUrl);
    
});

//route to get analytics of a url
router.get("/analytics/:shortId",handleAnalytics)

module.exports = router;