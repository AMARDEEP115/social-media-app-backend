const mongoose=require("mongoose");

const postsSchema=mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userID: String
});

const postsModel=mongoose.model("post",postsSchema);

module.exports=postsModel;