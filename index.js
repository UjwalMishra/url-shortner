const express = require("express");
const urlRoute = require("./routes/urlRoutes");
const dbConnect = require("./config/dbConnection");
const app = express();


const PORT = 3000;

//midlleware
app.use(express.json());

//db connection
dbConnect("mongodb://localhost:27017/urlShortner");

//routes --> /url
app.use("/url",urlRoute);

app.listen(PORT,()=> console.log(`Server started at ${PORT}`));
