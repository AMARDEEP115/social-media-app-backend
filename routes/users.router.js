const {Router}=require("express");
const usersModel = require("../model/users.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const usersRouter=Router();

usersRouter.get("/",async(req,res)=>{
    let all=await usersModel.find();
    res.send(all);
});

usersRouter.post("/register",(req,res)=>{
    try{
        let data=req.body;
        bcrypt.hash(data.password, Number(process.env.saltRounds), async(err, hash)=>{
            // Store hash in your password DB.
            if(err){
                console.log(err);
                res.send("Not Registered");
            } else {
                data.password=hash;
                let userReg=new usersModel(data);
                await userReg.save();
                res.send("registered");
            }
        });
    } catch(err){
        console.log(err);
        res.send("Not Registered");
    }
});

usersRouter.post("/login",async(req,res)=>{
    let data=req.body;
    try{
        let users=await usersModel.find({email:data.email});
        if(users.length>0){
            bcrypt.compare(data.password, users[0].password, (err, result)=>{
                // result == true
                if(result){
                    let token = jwt.sign({ userID: users[0]._id }, process.env.privateKey);
                    res.send({"msg":"Logged in","token":token})
                } else {
                    res.send("wrong password, Please try again...");
                }
            });
        } else {
            res.send("Please enter correct credentials");
        }
    } catch(err){
        console.log(err);
        res.send("something went wrong in login");
    }
});


module.exports=usersRouter;