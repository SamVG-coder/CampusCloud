const mongoose = require('mongoose');

var MiniSchema = new mongoose.Schema({
    projectName: String,
    teamMates: Array,
    domain: String,
    guide: String,
    batch: String,
    academicYear: Number,
    description: String
   });


   const Mini = module.exports = mongoose.model("mini", MiniSchema);
