const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
 
var UserSchema = new Schema({   
    email: {type: String, required:true, unique:true},
    username : {type: String, unique: true, required:true},
    games: [ObjectId],
});

var GameSchema = new Schema({
    isComputerGame: {type: Boolean},
    creatorID: {type: String, required: true},
    opponentUsername: {type: String, required: false, immutable: true}, // if isComputerGame is True, this field shouldn't exist.
    creatorIsBlack : {type: Boolean},
    moveHistory : [String],
    currentSFEN: {type: String},
    timeMade : {type: Date},
    timeControl : {type: String},
    minutesPerSide : {type: Number},
    byoyomiInSeconds : {type: Number},
    daysPerTurn: {type: Number},
    dateSinceLastCorrespondence: {type: Date},
    creatorTimeLeft : {type: Number},
    opponentTimeLeft: {type: Number},
    winnerID: {type: String},
    winningReason: {type: String},
})


UserSchema.plugin(passportLocalMongoose);
  
module.exports = {GameSchema: mongoose.model("Game", GameSchema), UserSchema: mongoose.model("User", UserSchema)};