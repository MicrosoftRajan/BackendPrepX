import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:"./.env"})

const pass = "hNdGGzR0FTIYFBmk"
const db = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.qbi2ag4.mongodb.net/?appName=Cluster0`

mongoose.connect(db).then(function(conn){
    console.log("connected to db")
}).catch(err => console.log(err))