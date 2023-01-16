const {Router}=require("express");
const postsModel = require("../model/posts.model");

const postsRouter=Router();

postsRouter.get("/",async(req,res)=>{
    let all=await postsModel.find({userID:req.body.userID});
    res.send(all);
});

postsRouter.post("/create",async(req,res)=>{
    let data=req.body;
    try{
        let post=new postsModel(data);
        await post.save();
        res.send("post is posted");
    } catch(err){
        res.send("something went wrong in posting the post");
    }
});

postsRouter.patch("/update/:id",async(req,res)=>{
    try{
        let postID=req.params.id;
        let post=await postsModel.findOne({_id:postID});
        if(req.body.userID===post.userID){
            let updates=req.body;
            await postsModel.findByIdAndUpdate({_id:postID},updates);
            res.send("Post updated");
        } else {
            res.send("this post is not your's , can't be updated");
        }
    } catch(err){
        console.log(err);
        res.send("something went wrong in updating post");
    }
});

postsRouter.delete("/delete/:id",async(req,res)=>{
    try{
        let postID=req.params.id;
        let post=await postsModel.findOne({_id:postID});
        if(req.body.userID===post.userID){
            await postsModel.findByIdAndDelete({_id:postID});
            res.send("Post Deleted");
        } else {
            res.send("this post is not your's , can't be deleted");
        }
    } catch(err){
        console.log(err);
        res.send("something went wrong in deleting post");
    }
});

module.exports=postsRouter;