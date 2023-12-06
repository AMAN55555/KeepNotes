const mongoose = require('mongoose');
const userSchema= mongoose.Schema({
    name:String,
    username:String,
    email:String,
    phone:String,
    password:String,
    profileImage:String
});

module.exports= mongoose.model("users",userSchema);