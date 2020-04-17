var passport = require("passport"),
  LocalStrategy = require('passport-local').Strategy;
const bcrypt= require('bcryptjs');
const User=require('../models/user');
const flash = require('connect-flash');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin:ccadmin@campuscloud-4xzaj.mongodb.net/test?retryWrites=true&w=majority/userDB", {useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);  
const loginHanding=(req,usn, password, done)=> {

      User.findOne({ usn: usn }, (err, user)=> {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, req.flash('error_msg','Incorrect username.' ));
        }
          if(user){
            let valid=bcrypt.compareSync(password,user.password);
            if(valid){
            return done(null,user);
          }else{
            return done(null, false,  req.flash('error_msg','Incorrect password.' ));
          }
          }
    });

 }
module.exports = function(){
  passport.serializeUser(function(user, done) {
    done(null,user.id); 
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id,function(err,user){
      done(err,user);
    })
  });

    passport.use('local', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback:true
    },loginHanding) )
    
}
