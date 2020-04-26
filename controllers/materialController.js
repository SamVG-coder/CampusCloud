require('../config/is-auth');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
exports.getAddMaterialPage=(req,res)=>{
    res.render('material/addMaterial', {
        path: '/studymaterial',
        isAuth:req.isAuthenticated(),
      });
}