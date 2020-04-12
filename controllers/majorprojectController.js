
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Major=require('../models/majorproject');
mongoose.Promise=global.Promise;
var path="mongodb://localhost:27017/userDB";
mongoose.connect(path, {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true); 

exports.searchProjects=(req,res)=>{
    var projects;
    if(req.body.userInput){
      var key=req.body.userInput;
      Major.find({$or:[{projectName:{$regex : new RegExp(key, "i")}},{guide:{$regex : new RegExp(key,"i")}}]},function(err ,found){
        res.render('home/majorproject', {
            path: '/majorproject',
            projects : found ,
            searched:key
          });
        });
    }
    else if(req.body.domain==="All"){
      Major.find(function(err ,found){
         res.render('home/majorproject', {
            path: '/majorproject',
            projects : found ,
            searched:"All"
          });
        });
    }   
    else{
      Major.find( {domain:req.body.domain},function(err ,found){
         res.render('home/majorproject', {
            path: '/majorproject',
            projects : found ,
            searched:req.body.domain
        });
    }); 
    }
}
