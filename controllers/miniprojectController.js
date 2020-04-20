require('../config/is-auth');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Mini=require('../models/miniproject');


exports.getAddProjectPage=(req,res)=>{
    res.render('miniproject/addMiniproject',{ success_msg:'',
    error_msg:'',  
    path: '/miniproject', 
    isAuth:req.isAuthenticated()});
}
exports.addProject=(req,res)=>{
  project= new Mini();
  project.projectName=req.body.name_project;
  
  project.teamMates.push({name:req.body.name_s1,usn:req.body.usn_s1},
                          {name:req.body.name_s2,usn:req.body.usn_s2},
                          {name:req.body.name_s3,usn:req.body.usn_s3}
                          );
  if(req.body.name_s4 && req.body.usn_s4){
    project.teamMates.push({name:req.body.name_s4,usn:req.body.usn_s4});
  }
  project.domain=req.body.domain;
  project.guide=req.body.guide;
  project.batch=req.body.batch;
  project.academicYear=req.body.year;
  project.description=req.body.description;
  project.uploadedBy=req.user.fname+' '+req.user.lname+' - '+req.user.usn
  Mini.findOne({uploadedBy:project.uploadedBy},(error,found)=>{
    if(error){
      console.log(error);
    }
    if(found){
      res.render('miniproject/addMiniproject',{error_msg:'Students are not allowed to Add Miniproject twice !!!',
      success_msg:'',
      projects:undefined,
      searched:'',
      path: 'miniproject/addMiniproject',
      isAuth:req.isAuthenticated()});
      }
      else{
        project.save(function(error){
          if(error){
          console.log(error);
          }
        });
        res.render('miniproject/addMiniproject',{success_msg:'Thanks for adding Miniproject !!!',
        error_msg:'',
        path: 'miniproject/addMiniproject',
        projects:undefined,
      searched:'',
        isAuth:req.isAuthenticated()});

      }
  })
  
}

exports.searchProjects=(req,res)=>{
    var projects;
    if(req.body.userInput){
      var key=req.body.userInput;
      Mini.find({$or:[{projectName:{$regex : new RegExp(key, "i")}},{guide:{$regex : new RegExp(key,"i")}}]},function(err ,found){
        res.render('home/miniproject', {
            path: '/miniproject',
            projects : found ,
            searched:key,
            isAuth: req.isAuthenticated()
          });
        });
    }
    else if(req.body.domain==="All"){
      Mini.find(function(err ,found){
         res.render('home/miniproject', {
            path: '/miniproject',
            projects : found ,
            searched:"All",
            isAuth: req.isAuthenticated()
          });
        });
    }   
    else{
      Mini.find( {domain:req.body.domain},function(err ,found){
         res.render('home/miniproject', {
            path: '/miniproject',
            projects : found ,
            searched:req.body.domain,
            isAuth: req.isAuthenticated()
        });
    }); 
    }
}