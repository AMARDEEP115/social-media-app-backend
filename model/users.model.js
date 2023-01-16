const mongoose=require("mongoose");

const usersSchema=mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String
});

const usersModel=mongoose.model("user",usersSchema);

module.exports=usersModel;