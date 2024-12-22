const URL = require("../models/urlModel");
const cuid = require('cuid');

//generate id
function generateId(length) {
    return cuid().slice(0, length);
}

async function shortUrlGenerator(req,res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error: "URL is required"});
    }
    const shortId = generateId(2);
    await URL.create({
        shortId: shortId,
        redirectUrl : body.url,
        visitHistory:[],
    });

    return res.json({id : shortId});
};

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

module.exports = {
    shortUrlGenerator,
    handleAnalytics
};