const URL = require("../models/urlModel");
const cuid = require('cuid');

async function shortUrlGenerator(req,res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: "URL is required"});
    }
    const shortId = Date.now();
    await URL.create({
        shortId: shortId,
        redirectUrl : body.url,
        visitHistory:[],
        createdBy : req.user._id,         
    });

    return res.render("generateShortUrl",{id:shortId});
};

//this is just for postman to check analytics --> no frontend is attached here
async function handleAnalytics(req,res){
    const shortId = req.params.shortId;
    console.log("short id : ",shortId);
    const result = await URL.findOne({shortId});
    console.log("Result : ",result);
    
    return res.status(200).json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory,
        redirectUrl : result.redirectUrl,
        shortId : result.shortId,
        newUrl : `http://localhost:3000/url/${result.shortId}`
    });
}

// using this controller i'm able to use the short url that i have generated
async function useShortUrl(req,res){
    const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }  // Return the updated document
        );
        res.redirect(entry.redirectUrl);
}
module.exports = {
    shortUrlGenerator,
    handleAnalytics,
    useShortUrl
};