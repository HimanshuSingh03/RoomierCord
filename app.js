const { aggregate } = require('./models/user');
const user = require('./models/user');

const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user");


//Static files
app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


//Connecting database
mongoose.connect('mongodb+srv://Himanshu:monissimo@roomiercordcluster.begei.mongodb.net/RoomCorDB?retryWrites=true&w=majority/himanshu', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

app.use(require("express-session")({
    secret: "Any normal Word",       //decode or encode session
    resave: false,
    saveUninitialized: false
}));
passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
//newly added
app.set('views', './views');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded(
    { extended: true }
))
app.use(passport.initialize());
app.use(passport.session());


var tempfirstname;
var templastname;
var tempusername;
var temppassword;
var tempuniversity;

var currentusername;




app.get("/", (req, res) => {
    res.render("home");
})


//Auth Routes
app.get("/login", (req, res) => {
    res.render("login");
});
app.post("/login", passport.authenticate("local", {
    successRedirect: "/mainpage",
    failureRedirect: "/login",
}), function (req, res) {
    console.log(err);
});



app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/register", (req, res) => {

    tempfirstname = req.body.firstname;
    templastname = req.body.lastname;
    tempusername = req.body.username;
    temppassword = req.body.password;
    tempuniversity = req.body.university;

    res.redirect("/attributes");
})


app.get("/attributes", (req, res) => {
    res.render("attributes");
});
app.post("/attributes", (req, res) => {

    User.register(new User({

        username: tempusername,
        firstname: tempfirstname,
        lastname: templastname,
        university: tempuniversity,
        partying: req.body.partying,
        cleanliness: req.body.cleanliness,
        cooking: req.body.cooking,
        smoker: req.body.pets,
        gender: req.body.gender,
        pets: req.body.pets,
        budget: req.body.budget,
        bio: req.body.bio,

    }), temppassword, function (err, user) {

    })
    res.redirect("/login");
})

app.get("/editattributes", isLoggedIn, (req, res) => {
    res.render("editattributes");
});
app.post('/editattributes', isLoggedIn, (req, res) => {

    currentusername = req.user.username

    db.collection('users').updateOne(

        {
            "username": currentusername
        },
        {
            $set: {
                partying: req.body.partying,
                cleanliness: req.body.cleanliness,
                cooking: req.body.cooking,
                pets: req.body.pets,
                smoker: req.body.pets,
                gender: req.body.gender,
                budget: req.body.budget,
                bio: req.body.bio
            }
        },
    )

    res.redirect("/mainpage");
});


app.get("/aboutus", (req, res) => {
    res.render("aboutus");
})



app.get("/mainpage", isLoggedIn, (req, res) => {

    User.find({ university: "Carleton"}, function(err, users) {

        res.render("mainpage", {
            usersList: users,
            universityname: req.user.university
        })
    })

    match(req.user.username, 4, 0, 0, 0, 0, 0, 0);

})
app.post("/mainpage", (req, res) => {
})



app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
//Listen On Server
app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started At Port 3000");
    }

});





function match(currentuser, dblength, gender, pets, partying, smoking, cooking, cleanliness) {
    
    console.log(currentuser);
    
    //weights
    const wgender = 0.20;
    const wpets = 0.10;
    const wpartying = 0.20;
    const wsmoking = 0.20;
    const wcooking = 0.10;
    const wcleanliness = 0.20;

    var matchscore = 0;
    var score;

    

    for (let i = 0; i < dblength; i++){
        
        var cursor = db.collection('users').find().toArray( function(err, spot) {
            console.log(spot[i].partying);
        });

        // //gender
        // if(gender == ){
        //     score += 1.0;
        // } else {
        //     score += 0.1;
        // }
        // matchscore += score*wgender;

    }//end of loop
    


}