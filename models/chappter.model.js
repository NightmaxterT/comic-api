const mongoose=require('mongoose');

let chappterSchema=new mongoose.Schema({
    Name:String,
    Chappter:{
        Number:Array
    }
});

let chapter=mongoose.model('chapter',chappterSchema,'comicChappter');

module.exports=chapter;