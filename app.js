const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');

const errorController = require('./controllers/error');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const majorprojectRoutes = require('./routes/majorprojectRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret:"sdmcet Dharwad", resave:false,saveUninitialized: false }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use('/major',majorprojectRoutes);
app.use('/user',userRoutes);
app.use('',homeRoutes);


app.use(errorController.get404);


app.listen(process.env.PORT||3000, function() {
    console.log("Server started on port 3000.");
  });