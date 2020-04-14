require('dotenv').config();
const express=require('express');
const port=3000;
const app=express();
const bodyParser=require('body-parser');
const comicRouter=require('./routers/comic.router');
const userRouter=require('./routers/user.router');
const mongoose=require('mongoose');
const cokieParser=require('cookie-parser');
mongoose.connect(process.env.MONGO_URL);

app.set('view engine','pug');
app.set('views','./views');
app.use(cokieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.get('/',function(req,res){
//     res.render('comic/TrangChu.pug');
    
// });

app.use('/',userRouter);
app.use('/',comicRouter);


app.listen(port,function () {
    console.log("Server listen on port "+port);
  })