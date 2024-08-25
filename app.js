const express = require("express");
const app = new express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const fileUpload = require('express-fileupload');

const dbPort = process.env.DB_PORT;

mongoose.connect(dbPort).then(()=>{
    console.log(`--Database connected---`)
}).catch((e)=>{
    console.log(e)
})




app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.json());

app.get("/",async(req,res)=>{
    res.send("Server running");
})

app.use(fileUpload({
    useTempFiles : true
}))

// user routes
const router = require("./src/routes/userApi");
app.use("/api/v1",router);

// admin route

const adminRoute = require("./src/routes/adminApi");
app.use("/api/v1", adminRoute )



module.exports = app;