const express=require("express");
const connection = require("./config/db");
const authentication = require("./middleware/authentication.middleware");
const postsRouter = require("./routes/post.router");
const usersRouter = require("./routes/users.router");
const cors=require("cors");
require("dotenv").config();

const app=express();

app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("to use put /users  or /posts after url");
});

app.use("/users",usersRouter);

app.use(authentication);

app.use("/posts",postsRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to DB");
    } catch(err){
        console.log("not connected to DB");
    }
    console.log(`server is running at port ${process.env.port}`);
});