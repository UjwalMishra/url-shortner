const express = require("express");
const {shortUrlGenerator,handleAnalytics,useShortUrl} = require("../controllers/urlController");
// const home = require("../views/home.ejs");
const URL = require("../models/urlModel");

const router = express.Router();

//route for posting a url to get its short url
router.post("/",shortUrlGenerator);

//route for using the shortUrl
router.get("/:shortId",useShortUrl);

//route to get analytics of a url
router.get("/analytics/:shortId",handleAnalytics);


//pending task :-

//route to delete shortUrl from db
// Delete route to remove a short URL
router.post("/delete/:shortId", async (req, res) => {
    const { shortId } = req.params;

    try {
        const entry = await URL.findOneAndDelete({ shortId });

        if (!entry) {
            return res.status(404).json({ message: "URL not found" });
        }
        
        return  res.redirect("/home");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to delete the URL" });
    }
});

module.exports = router;