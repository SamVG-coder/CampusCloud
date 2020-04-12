const mongoose = require('mongoose');

var MajorSchema = new mongoose.Schema({
    projectName: String,
    teamMates: Array,
    domain: String,
    guide: String,
    batch: String,
    academicYear: Number,
    description: String
   });


   const Major =module.exports= mongoose.model("major", MajorSchema);
