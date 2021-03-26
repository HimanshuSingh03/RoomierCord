const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    password:String,
    university:String,
    partying:Number,
    cleanliness:Number,
    cooking:Number,
    gender:String,
    smoker:String,
    pets:String,
    budget:String,
    bio:String,

}) ;
UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User",UserSchema);