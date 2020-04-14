const mongoose=require('mongoose');

let userSchema=new mongoose.Schema({
    Name:String,
    User:String,
    Pass:String,
    Avatar:String,
    comicFollow:Array,
    role:String,
    History:Array
});

let user=mongoose.model('user',userSchema,'users');

module.exports=user;