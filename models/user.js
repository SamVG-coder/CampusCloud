const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    fname: String,
    lname: String,
    usn: String,
    email: String,
    password: String,
    phone: String,
    otp: String,
    verified : Boolean
   });

const User = module.exports =mongoose.model("User", userSchema);