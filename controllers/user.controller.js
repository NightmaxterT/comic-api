const userModel=require('../models/user.model');
const comicModel=require('../models/comic.model');
const Users=require('../models/classes/user');
const bcrypt=require('bcrypt');

async function GetUserDB(){
    let arrUser=[];
    let userDB=await userModel.find();
    for(let item of userDB)
    {
        let user=new Users(item.Name,item.User,item.Pass,item.comicFollow,item.History,item.role,item.Avatar);
        
        arrUser.push(user);
    }
    return arrUser;
}
function removeAccents(str) {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }
module.exports.Register=async (req,res)=>{
    res.render('comic/dangKy.pug')
}
module.exports.postRegister=async (req,res)=>{
    let user=new Users(req.body.Name,req.body.User,req.body.pass);
    userModel.findOne({"User":req.body.User},(err,find)=>{
        if(!find){
        this.addUser(user);
        res.redirect('/Users/Login');
        }
        else{
            res.render('comic/dangKy.pug',{err:['Tên tài khoản đã có người sử dụng!',"display:block"]});
        }
    });
    // res.render('comic/dangNhap.pug')
}
module.exports.Login=async (req,res)=>{
    
    res.render('comic/dangNhap.pug',{err:["","display:block",""]});
}
module.exports.postLogin=async (req,res)=>{
    userModel.findOne({"User":req.body.name},(err,find)=>{
        if(!find)
        res.render('comic/dangNhap.pug',{err:["Không tìm thấy tên đăng nhập!","display:block",""]});
        if(find){
            if(find.Pass!=req.body.pass)
            res.render('comic/dangNhap.pug',{err:["","display:block","Sai mật khẩu!"]});
            else{
                res.cookie("id",find._id);
                res.redirect('/');
            }
        }
    });
    
    
    // res.render('comic/dangNhap.pug')
}


module.exports.getAllUser=async (req,res)=>{
    let userList=await GetUserDB();
    res.json(userList);
}
module.exports.addUser=async (user)=>{
    
    userModel.insertMany(user);
}
module.exports.deleteUser=async (req,res)=>{
    userModel.deleteOne({"_id":req.params.ID},(err)=>{
        console.log(err);
    });
}
module.exports.searchUser=async (req,res)=>{
    let arrSearch=[];
    let nameReq=req.params.Name.split(' ');
    let userList=await GetUserDB();
    for(let i=0; i<userList.length;i++){
        if(userList[i].Name==req.params.Name)
        arrSearch.push(userList[i]);
        if(removeAccents(userList[i].Name).toLowerCase()==req.params.Name){
            arrSearch.push(userList[i]);
        }
        if(nameReq[i]!="undefined"){
            if(userList[i].Name.indexOf(nameReq[i])!=-1||userList[i].Name.toLowerCase().indexOf(nameReq[i])!=-1||removeAccents(userList[i].Name).indexOf(nameReq[i])!=-1||removeAccents(userList[i].Name).toLowerCase().indexOf(nameReq[i])!=-1)
            arrSearch.push(userList[i]);
        }
    }
    // for(let key of nameReq){
               
    //     if(item.name.indexOf(key)!=-1||item.name.toLowerCase().indexOf(key)!=-1||removeAccents(item.Name).indexOf(key)!=-1||removeAccents(item.Name).toLowerCase().indexOf(key)!=-1)
    //     arrSearch.push(item);
    // }
    // var filter=userList.filter((item,index)=>{
    //     if(nameReq[index]!="undefined"){
    //     if(item.name.indexOf(nameReq[index])!=-1||item.name.toLowerCase().indexOf(nameReq[index])!=-1||removeAccents(item.Name).indexOf(nameReq[index])!=-1||removeAccents(item.Name).toLowerCase().indexOf(nameReq[index])!=-1)
    //     return item;
    //     }

    // })
    res.json(arrSearch);
}
module.exports.updateUser=async (req,res)=>{
    userModel.findOne({"_id":req.body.ID},(err,findObject)=>{
        if(err){
            console.log(err);
        }
        else{
            if(!findObject){
                res.status(404).send();
            }
            else{
                if(req.body.Name){
                    findObject.Name=req.body.Name;
                }
                if(req.body.Avatar){
                    findObject.Avatar=req.body.Avatar;
                }
                findObject.save((err,update)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("sucess");
                }
                })
               
            }
        }
    });
    // let user=new Users(req.body.Name,req.body.User,userDB.Pass,req.body.comicFollow,req.body.Avatar);
}