const comicModel=require('../models/comic.model');
const comic=require('../models/classes/comic');
const userModel=require('../models/user.model');
const Users=require('../models/classes/user');


  
module.exports.Pagination=async (req,res)=>{
    let user;
    let arrFollow=null;
    let arrHistory=null;
    let arrComic=[];
    let ComicModel=await comicModel.find();
    for(let item of ComicModel)
    {
        let Comic=new comic(item.Name,item.NameCommon,item.Summary,item.Author,item.Status,item.Avatar,item.Category,item.View,item.Chappter,item.FolloW);
        arrComic.push(Comic);
    }
    let page=parseInt(req.params.page)||1;
    let perPage=12;
    let start=(page-1)*perPage;
    let end=(page-1)*perPage+perPage;
    let arrNew=arrComic.slice(start,end);
    let total=await this.GetAll();
    let nominations=await this.GetComicByView(100);
    if(req.cookies.id!=null){
    arrFollow=await GetComicFollow(req.cookies.id);
    arrHistory=await getComicHistory(req.cookies.id);
    if(arrFollow.length>5&&arrHistory.length>5){
        arrFollow.pop();
        arrHistory.pop();
    }
    }
    
  
   
    // res.render('comic/TrangChu.pug',{arrComic:arrNew,totalPage:total,nominations:nominations,users:[arrFollow,arrHistory,"display:block","display:none"]});
    res.json({"Page":arrNew,"Silder":nominations,"Follow":arrFollow,"History":arrHistory});
}

module.exports.GetAll=async(req,res)=>{
    let arrComic=[];
    let ComicModel=await comicModel.find();
    for(let item of ComicModel)
    {
        let Comic=new comic(item.Name,item.NameCommon,item.Summary,item.Author,item.Status,item.Avatar,item.Category,item.View,item.Chappter,item.Follow);
        arrComic.push(Comic);
    }
    
    return arrComic.length;
    
}
module.exports.GetComicByView=async(number)=>{
    let arrComic=[];
    let ComicModel=await comicModel.find();
    for(let item of ComicModel)
    {
        let Comic=new comic(item.Name,item.NameCommon,item.Summary,item.Author,item.Status,item.Avatar,item.Category,item.View,item.Chappter,item.Follow);
        if(Comic.View>Math.ceil( Math.random()*number)&&arrComic.length<=11)
        arrComic.push(Comic);
    }
        return arrComic;

}
module.exports.SearchByName=async(req,res)=>{
    let arrComic=[];
    let arrSearch=[];
    let ComicModel=await comicModel.find();
    for(let item of ComicModel)
    {
        let Comic=new comic(item.Name,item.NameCommon,item.Summary,item.Author,item.Status,item.Avatar,item.Category,item.View,item.Chappter,item.Follow);
        arrComic.push(Comic);
    }
    let key=req.params.name;
    let keyConvert=key.split(' ');
    for(let i=0; i<arrComic.length;i++){
        if(arrComic[i].Name.toLowerCase().indexOf(key.toLowerCase())!=-1||(arrComic[i].NameCommon.toLowerCase().indexOf(key.toLowerCase())!=-1)){
        arrSearch.push(arrComic[i]);
        }
        if(keyConvert[i]!="underfined" && arrSearch==[]){
            if(arrComic[i].Name.toLowerCase().indexOf(keyConvert[i].toLowerCase())!=-1||(arrComic[i].NameCommon.toLowerCase().indexOf(keyConvert[i].toLowerCase())!=-1))
            arrSearch.push(arrComic[i]);
    }
}

    res.json(arrSearch);
    
}

module.exports.infoComic=async(req,res)=>{
    let arrComic=[];
    let arrSearch;
    let ComicModel=await comicModel.find();
    for(let item of ComicModel)
    {
        let Comic=new comic(item.Name,item.NameCommon,item.Summary,item.Author,item.Status,item.Avatar,item.Category,item.View,item.Chappter,item.Follow);
        arrComic.push(Comic);
    }
    let key=req.params.name;
    let keyConvert=key.split(' ');
    for(let i=0; i<arrComic.length;i++){
        if(arrComic[i].Name.toLowerCase().indexOf(key.toLowerCase())!=-1||(arrComic[i].NameCommon.toLowerCase().indexOf(key.toLowerCase())!=-1)){
        arrSearch=arrComic[i];
        }
        if(keyConvert[i]!="underfined" && arrSearch==[]){
            if(arrComic[i].Name.toLowerCase().indexOf(keyConvert[i].toLowerCase())!=-1||(arrComic[i].NameCommon.toLowerCase().indexOf(keyConvert[i].toLowerCase())!=-1))
            arrSearch=arrComic[i];
    }
}
    // console.log(arrSearch.Chappter);
res.render('comic/thongTinTruyen.pug',{arrSearch:arrSearch});
res.json(arrSearch);
}
module.exports.readComic=async(req,res)=>{
    let arrComic=[];
    let arrSearch;
    let ComicModel=await comicModel.find();
    for(let item of ComicModel)
    {
        let Comic=new comic(item.Name,item.NameCommon,item.Summary,item.Author,item.Status,item.Avatar,item.Category,item.View,item.Chappter,item.Follow);
        arrComic.push(Comic);
    }
    let key=req.params.name;
    let numberChappter=parseInt(req.params.number);
    let keyConvert=key.split(' ');
    for(let i=0; i<arrComic.length;i++){
        if(arrComic[i].Name.toLowerCase().indexOf(key.toLowerCase())!=-1||(arrComic[i].NameCommon.toLowerCase().indexOf(key.toLowerCase())!=-1)){
        arrSearch=arrComic[i];
        }
        if(keyConvert[i]!="underfined" && arrSearch==null){
            if(arrComic[i].Name.toLowerCase().indexOf(keyConvert[i].toLowerCase())!=-1||(arrComic[i].NameCommon.toLowerCase().indexOf(keyConvert[i].toLowerCase())!=-1))
            arrSearch=arrComic[i];
    }
}
    let result=arrSearch.Chappter[numberChappter-1];
    let total=arrSearch.Chappter.length;
    let chappterPre=numberChappter;
    let codeName=arrSearch.Name;
    // console.log(result);
res.render('comic/docTruyen.pug',{result:result,total:total,chappterPre:chappterPre,codeName:codeName});
res.json(arrSearch);
}
module.exports.Follow=async (req,res)=>{
    let followRight=null;
    let arrHistory=null;
    let arrNew=null;
    if(req.cookies.id){
    let arrFollow=await GetComicFollow(req.cookies.id);
    let page=parseInt(req.params.page)||1;
    let perPage=12;
    let start=(page-1)*perPage;
    let end=(page-1)*perPage+perPage;
    arrNew=arrFollow.slice(start,end);
    followRight=arrFollow;
    if(followRight.length>5)
        followRight.pop();
    let arr=await getComicHistory(req.cookies.id);
    arrHistory=arr;
    if(arrHistory.length>5)
    arrHistory.pop();
    }
    
    res.render('comic/truyenTheoDoi.pug',{arrFollow:arrNew,followRight:followRight,arrHistory:arrHistory,Styles:["display:none","display:block"]});
}

module.exports.searchByAll=async(req,res)=>{
    let arrComic=[];
    let arrSearch=[];
    let arrResult=[];
    let ComicModel=await comicModel.find();
    for(let item of ComicModel)
    {
        let Comic=new comic(item.Name,item.NameCommon,item.Summary,item.Author,item.Status,item.Avatar,item.Category,item.View,item.Chappter,item.Follow,item._id);
        arrComic.push(Comic);
    }
    let key=req.params.values;
    let keyConvert=key.split('&');
    let keyCategory=keyConvert[0].split(',');
    let keyChappter=parseInt( keyConvert[1]);
    let keyStatus=keyConvert[2];

    if(keyCategory!=''){
    for(let key of arrComic){
        let temp=key.Category.concat(keyCategory).filter((item,index,arr)=>{
                return arr.indexOf(item)!==index;
        })
                if(temp.length==keyCategory.length)
        arrSearch.push(key);
    }
    arrResult=arrSearch.map((item)=>{
        if(item.Chappter==keyChappter&&item.Status==keyStatus)
        return item;
    });
    }
else{
    arrResult=arrComic.map((item)=>{
        if(item.Chappter==keyChappter&&item.Status==keyStatus)
        return item;
    })
}
res.json(arrResult);
}
module.exports.addComic=async (req,res)=>{
    console.log(req.body);
    let reqComic=new comic(req.body.Name,req.body.NameCommon,req.body.Summary,req.body.Author,req.body.Status,req.body.Avatar,req.body.Category);
    comicModel.insertMany([reqComic]);

}
module.exports.deteleComic=(req,res)=>{
    comicModel.deleteOne ({"Name":req.params.Name},(err)=>{
        console.log(err);
    })
}
module.exports.updateComic=(req,res)=>{
    console.log(req.body);
    comicModel.deleteOne ({"Name":req.body.Name},(err)=>{
        console.log(err);
    })
    comicModel.insertMany([req.body]);
}
  async function GetComicFollow (cookies){
    let arrComic=[];
    let arrFllow;
    await userModel.findOne({"_id":cookies},(err,finds)=>{
        if(finds)
        {
            arrFllow=finds;
        }
    });
    
    for(item of arrFllow.comicFollow){   
       await comicModel.findOne({"Name":item},async (err,res)=>{
         await arrComic.push(res);
        }) 
    }  
    return arrComic;
}
async function getComicHistory(cookies){
    let arrComic=[];
    let arrHistory;
    await userModel.findOne({"_id":cookies},(err,finds)=>{
        if(finds)
        {
            arrHistory=finds;
        }
    });
    
    for(item of arrHistory.History){   
       await comicModel.findOne({"Name":item},async (err,res)=>{
         await  arrComic.push(res);
        })
    }
        
    return arrComic;
}
    // console.log(arr);
