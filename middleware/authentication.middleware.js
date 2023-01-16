// const jwt=require("jsonwebtoken");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const authentication=(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        const decoded = jwt.verify(token, process.env.privateKey);
        if(decoded){
            req.body.userID=decoded.userID;
            next();
        } else {
            res.send("login again");
        }
    } else {
        res.send("login first");
    }
    // if(decoded){
    //     req.body.userID=decoded.id;
    // }
};

module.exports=authentication;