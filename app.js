const express = require("express");
const app = new express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const dbPort = process.env.DB_PORT;

mongoose.connect(dbPort).then(()=>{
    console.log(`--Database connected---`)
}).catch((e)=>{
    console.log(e)
})

app.get("/",async(req,res)=>{
    res.send("Server running");
})


app.use(cors());



module.exports = app;