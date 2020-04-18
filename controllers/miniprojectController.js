require('../config/is-auth');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Major=require('../models/majorproject');
mongoose.Promise=global.Promise;
var path="mongodb+srv://admin-super:super@campuscloud-gavwb.mongodb.net/userDB?retryWrites=true&w=majority";
mongoose.connect(path, {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

exports.getAddProjectPage=(req,res)=>{
    res.render('miniproject/addMiniproject',
    {path: '/miniproject',
      isAuth:req.isAuthenticated()});
}