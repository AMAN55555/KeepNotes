const mongoose = require('mongoose');
const noteSchema= mongoose.Schema({
    title:String,
    username:String,
    note:String
});

module.exports= mongoose.model("notes",noteSchema);