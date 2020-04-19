const mongoose = require('mongoose');
var studentSchema = new mongoose.Schema({
    usn: String,
    email: String,
   });

const Student = module.exports =mongoose.model("Student", studentSchema);