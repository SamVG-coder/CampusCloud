const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session')
const logger = require("morgan");
const passport = require("passport"); 
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const homeRoutes = require('./routes/homeRoutes');
const userRoutes = require('./routes/userRoutes');
const majorprojectRoutes = require('./routes/majorprojectRoutes');
const miniprojectRoutes = require('./routes/miniprojectRoutes');

require('./config/is-auth');

const app = express();

require("./config/passport")();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin-super:super@campuscloud-gavwb.mongodb.net/userDB?retryWrites=true&w=majority", {useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);  

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(
  cookieSession({
    maxAge: 1209600000,
    keys: ["HELLODEARLPEOPLEFROMSAMVG"]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(cookieParser());
app.use(flash());

app.use('/major',majorprojectRoutes);
app.use('/mini',miniprojectRoutes);
app.use('/user',userRoutes);
app.use('',homeRoutes);


app.use(errorController.get404);


app.listen(process.env.PORT||3000, function() {
    console.log("Server started on port 3000.");
  });