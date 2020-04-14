const userModel=require('../models/user.model');
const comicModel=require('../models/comic.model');
const Users=require('../models/classes/user');
const bcrypt=require('bcrypt');

module.exports.authen= async (req,res,next)=>{
    let styles=["display: block","display:none"];
    
    await userModel.findOne({"_id":req.cookies.id},(err,find)=>{
        if(find){
            res.locals.styles=styles;
            res.locals.user=find;
        }
        else
        console.log(err);
    });
    
next();
}