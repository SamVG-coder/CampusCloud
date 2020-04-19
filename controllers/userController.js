const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt= require('bcryptjs');
const nodemailer = require('nodemailer');
const passport = require("passport");
const Student=require('../models/student');
const User=require('../models/user');
mongoose.Promise=global.Promise;
var path="mongodb+srv://admin-super:super@campuscloud-gavwb.mongodb.net/userDB?retryWrites=true&w=majority";
mongoose.connect(path, {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true); 

exports.getSignupPage=(req, res)=>{
    res.render("user/signup",{error_msg :'', success_msg:'', pageTitle: 'Sign Up'

    });
}

exports.getLoginPage=(req, res)=>{

    res.render("user/login",{error_msg :req.flash('error_msg'), success_msg:'',pageTitle: 'Login'});
}

exports.createUser=("/register",(req,res)=>{
    var newUser=new User(req.body);
    var userMail=req.body.email;
    Student.findOne({$and :[{usn:newUser.usn},{email:newUser.email}]},(err, foundUser)=>{
      console.log(foundUser)
      if(foundUser===null){
        Student.findOne({usn:newUser.usn},(err, User)=>{
          console.log(foundUser)
          if( User){
          error_msg='Entered email and usn is not matching. USN: '+User.usn+'is matching with email: '+User.email;
          res.render('user/signup',{error_msg:error_msg , pageTitle:'Sign Up'})
          }
          })
      }
      else{
        User.findOne({ $or: [ {usn :newUser.usn}, { email: newUser.email } ] },(err, foundUser)=>{

          if (err) {
            console.log(err);
          } else {
            if (foundUser==null ||foundUser.verified==false) {
              if(foundUser!==null && foundUser.verified==false){
                User.findOneAndDelete({usn:foundUser.usn },(err, foundUser)=>{
  
                  if (err) {
                    console.log(err);
                  }
                });
              }
              newUser.username=newUser.usn;
              newUser.otp=Math.floor(Math.random()*10000);
              bcrypt.hash(req.body.password , 5, function(err, hashedPassword) {
                newUser.password=hashedPassword.slice();
                //console.log( "hashed :" + hashedPassword);
                newUser.verified=false;
                newUser.save(function(error){
                    if(error){
                    console.log(error);
                }
              });
            });
            
              console.log("otp : "+newUser.otp);
              const transport = nodemailer.createTransport({
              service : 'gmail',
              auth: {
                user: 'sdmcet.cse.campuscloud@gmail.com',
                pass: 'ccsdmcet'
              }
            });
            const message = {
              from: 'sdmcet.cse.campuscloud@gmail.com', // Sender address
              to: userMail,         // List of recipients
              subject: 'Campus Cloud Student Verification ', // Subject line
              text: "Hi Peppy, Welcome to Campus cloud !!!", // Plain text body
              html:"<h1> your verification code is "+newUser.otp+"</h1>"
          };
          transport.sendMail(message, function(err, info) {
          if (err) {
            console.log(err)
          } else {
             //console.log(info);
          }
      });
      res.render("user/otp" ,{error_msg :'',pageTitle : 'Verification',path:'/signup',email:userMail});
    }
    else{
          error_msg="user exists with entered USN : "+newUser.usn+" or Gmail: " +userMail;
            res.render("user/signup",{error_msg:error_msg, pageTitle:'Sign Up'});
          }
        }
      });
      }
    })

  });


exports.getOtp=(req,res)=>{

    User.findOneAndUpdate({ $and: [ {otp :req.body.otp }, { verified: false } ] },{$set : {verified:true}},(err, foundUser)=>{
      User.findOneAndUpdate({ $and: [ {otp :req.body.otp }, { verified: true } ] },{$set : {otp:''}},(err, foundUser)=>{
        if (err) {
          console.log(err);
        }
      });
        if (err) {
          console.log(err);
        }
      if (err) {
        console.log(err);
      } else {
        if (foundUser==null) {
            error_msg="Invalid OTP";
            res.render("user/otp",{error_msg:error_msg, pageTitle:'Verification', path:'/signup', email:req.body.email});
        }else{
          res.render("user/login",{success_msg:"Registration successful !!!", pageTitle:'Login',error_msg:''});

        } 
        } 
  });
}

exports.getForgotPasswordPage=(req,res)=>{
  res.render("user/forgotpassword",{pageTitle:'Verify E-mail',error_msg:''});
}
exports.checkEmail=(req,res)=>{

  var userMail=req.body.email;
  var generatedOtp=Math.floor(Math.random()*10000);
    User.findOneAndUpdate({ $and: [ {email :userMail}, { verified: true } ] },{$set: {otp:generatedOtp}},(err, foundUser)=>{
      if (err) {
        console.log(err)
      }
      if(foundUser!=null){
        const transport = nodemailer.createTransport({
          service : 'gmail',
          auth: {
            user: 'sdmcet.cse.campuscloud@gmail.com',
            pass: 'ccsdmcet'
          }
        });
        const message = {
          from: 'sdmcet.cse.campuscloud@gmail.com', // Sender address
          to: userMail,         // List of recipients
          subject: 'Campus Cloud Student Verification ', // Subject line
          text: "Hi Peppy, Welcome to Campus cloud !!!", // Plain text body
          html:"<h1> your verification code is "+generatedOtp+"</h1>"
      };
      transport.sendMail(message, function(err, info) {
      if (err) {
        console.log(err)
      } else {
         //console.log(info);
      }
      });
      res.render("user/otp",{error_msg :'',pageTitle : 'Verification',path:'/reset-pass',email:userMail});
    }else{
    res.render("user/forgotpassword",{error_msg :'Please enter your registered email.',pageTitle : 'Verification',path:'/reset-pass'});
    }
  });

}

exports.getOtpForResetPassword=(req,res)=>{


  User.findOneAndUpdate({ $and: [ {otp :req.body.otp }, { verified: true } ] },{$set : {otp:''}},(err, foundUser)=>{
      if (err) {
        console.log(err);
      }
      if (err) {
        console.log(err);
      }
    if (err) {
      console.log(err);
    } else {
      if (foundUser==null) {
          error_msg="Invalid OTP";
          res.render("user/otp",{error_msg:error_msg, pageTitle:'Verification', path:'/reset-pass',email:req.body.email});
      }else{
        res.render("user/set-pass",{ pageTitle:'Set Password',error_msg:'',email:req.body.email});
      } 
    } 
    });
}


exports.setNewPassword=(req,res)=>{
  bcrypt.hash(req.body.new_pass , 5, function(err, hashedPassword) {
    if (err) {
      console.log(err);
    }
    User.findOneAndUpdate({ $and: [ {email :req.body.email }, { verified: true } ] },{$set : {password:hashedPassword}},(err, foundUser)=>{
      if (err) {
        console.log(err);
      }
      res.render("user/login",{success_msg:"Password Updated successfully !!!", pageTitle:'Login',error_msg:''});
    });
  });
}

exports.loginUser=(req, res, next)=> {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true
    
  })(req, res, next);
};

exports.logoutUser=(req,res)=>{
  req.logout();
  res.redirect('/');

}