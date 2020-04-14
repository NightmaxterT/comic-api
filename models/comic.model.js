const mongoose=require('mongoose');

let comicSchema=new mongoose.Schema({
    Name:String,
    NameCommon:String,
    Summary:String,
    Author:String,
    Status:String,
    Category:Array,
    Avatar:String,
    View:Number,
    Chappter:Object,
    Follow:Number
});

let comic=mongoose.model('comic',comicSchema,'comics');

module.exports=comic;