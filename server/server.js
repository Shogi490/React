const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const passportLocal = require("passport-local")
const app  = express();
const cors = require("cors");
var jwt = require('jsonwebtoken');

app.use(cors());

//middleware for verification of JWT
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token) {
        res.send("You are not authorized.");
    } else {
        jwt.verify(token, "TheG0ldenC@tRunsFree", (err, decoded) => {
            if(err) {
                res.json({sucess: false, message: "Failed to authenticate token"});
            } else {
                req.username = decoded.username;
                next();
            }
        })
    }
}

//import user model
const Schemas = require('./model/user.js');
const User = Schemas.UserSchema;
const Game = Schemas.GameSchema;
passport.use((User.createStrategy()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connecting to db
const dotenv = require("dotenv").config();
console.log(process.env.MONGO_URL);
const temporaryMongoURL = "mongodb+srv://birdbear:Timmp0Pdsi5@cluster0.azmhy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(temporaryMongoURL, {useNewUrlParser: true}).then(()=> console.log("MongoDB successfully connected")).catch(err => console.log(err));
//connect to db end
app.get("/404", (req,res) => {
    res.json({message: "404 page not found"});
})

app.get("/isuserauth", verifyJWT, (req,res) => {
    res.send({username: req.username});
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
            if(loginErr) res.json({sucess: false, message: "Login Error"});
            //the jwt secret needs to be an env variable, will add to .env file eventually.
            const token =  jwt.sign({userId : user._id, username:user.username}, "TheG0ldenC@tRunsFree", {expiresIn: '24h'})
            return res.send({success: true, message: "Auth succeeded", token: token})
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

app.get("/user/:id", verifyJWT , (req,res) => {
    let id = req.params.id;
    if (req.username === id) {
        res.json({isPerson: true}); //send database material too
    } else {
        res.json({isPerson: false}); //send database material too
    }
})

app.get("/game/:id", (req,res)=> {
    //res with data, store it into board on <GamePage>
    //FindByID - mongoose 
    Game.findById(req.params.id, ( err, game) => {
        if( err ) {
            // do something;
            console.error(err);
            res.send("Game Not Found");
            return;
        }
        console.log(`Successfully found game: ${game._id}`);
        res.send(game.toJSON());
    });
})

app.post("/create/game", (req,res) => {
    const games = new Game(req.body)
        games.save(function (err) {
            res.json({_id: games._id, error: err});
            if(err) return err;
            
        })

})

const port = process.env.port || 5000;

app.listen(port, () => console.log("Server up and running on port" + port));