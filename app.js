const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const errorController = require('./controllers/error');
const homeRoutes = require('./routes/homeRoutes');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static("public"));
app.set('view engine', 'ejs');


app.use('',homeRoutes);

app.use(errorController.get404);


app.listen(process.env.PORT||3000, function() {
    console.log("Server started on port 3000.");
  });