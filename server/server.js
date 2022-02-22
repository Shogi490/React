const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const passportLocal = require("passport-local")
const app  = express();
const cors = require("cors");

app.use(cors());


//import user model
const User = require('./model/user');
passport.use((User.createStrategy()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connecting to db
const dotenv = require("dotenv").config();
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}).then(()=> console.log("MongoDB successfully connected")).catch(err => console.log(err));
//connect to db end
app.get("/404", (req,res) => {
    res.json({message: "404 page not found"});
})
app.post('/login', function (req,res,next) {
    passport.authenticate('local', function(err, user, info) {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.send({success: false, message: "Wrong username or password"});
        }
        req.login(user, loginErr => {
            if(loginErr) return next( loginErr);
            return res.send({success: true, message: "Auth succeeded"})
        })

    })(req,res,next);
});

app.post("/sign-up", (req,res) => {
    Users=new User({email: req.body.email, username : req.body.username});
        User.register(Users, req.body.password, function(err, user) {
            if (err) {
              res.json({success:false, message:"Your account could not be saved. Error: ", err});
            }else{
              res.json({success: true, message: "Your account has been saved"});
            }
        });
});


const port = process.env.port || 5000;

app.listen(port, () => console.log("Server up and running on port" + port));