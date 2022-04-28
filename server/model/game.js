const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    isComputerGame: Boolean,
    creatorID: {type: ObjectId, required: true, immutable: true},
    opponentID: {type: UserSchema, required: false, immutable: true}, // if isComputerGame is True, this field shouldn't exist.
    creatorIsBlack : Boolean,
    moveHistory : [String],
    currentSFEN: String,
    timeMade : Date,
    timeControl : String,
    minutesPerSide : Number,
    byoyomiInSeconds : Number,
    daysPerTurn: Number,
    dateSinceLastCorrespondence: Date,
    creatorTimeLeft : Number,
    opponentTimeLeft: Number,
})

module.exports = mongoose.model("Game", GameSchema);