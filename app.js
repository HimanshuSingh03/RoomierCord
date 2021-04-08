const { aggregate } = require('./models/user');
const user = require('./models/user');

const   express = require('express'),
        app = express(),
        mongoose = require("mongoose"),
        passport = require("passport"),
        bodyParser = require("body-parser"),
        LocalStrategy = require("passport-local"),
        passportLocalMongoose = require("passport-local-mongoose"),
        User = require("./models/user"),
        flash = require('connect-flash');


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
app.use(flash());


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

app.post("/login", passport.authenticate('local', {
    successRedirect: "/mainpage",
    failureRedirect: "/login",
    failureFlash: true })
);



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
        smoker: req.body.smoker,
        gender: req.body.gender,
        pets: req.body.pets,
        budget: req.body.budget,
        bio: req.body.bio,
        age: req.body.age,
        maxdistance: req.body.maxdistance,

    }), temppassword, function (err, user) {

    })
    res.redirect("/login");
})



app.get("/editattributes", isLoggedIn, (req, res) => {
    res.render("editattributes", {
        firstnameOLDvalue: req.user.firstname,
        lastnameOLDvalue: req.user.lastname,
        universityOLDvalue: req.user.university,
        partyOLDvalue: req.user.partying,
        cleanOLDvalue: req.user.cleanliness,
        cookingOLDvalue: req.user.cooking,
        distanceOLDvalue: req.user.cooking,
        ageOLDvalue: req.user.age,
        smokingOLDvalue: req.user.smoking,
        petsOLDvalue: req.user.pets,
        budgetOLDvalue: req.user.budget

    })
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
                smoker: req.body.smoker,
                gender: req.body.gender,
                budget: req.body.budget,
                bio: req.body.bio,
                age: req.body.age,
                maxdistance: req.body.maxdistance
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

        //CODE FOR MATCHING SCRIPT ------------------------------------------------------
        //weights
        const wgender = 0.25;
        const wpets = 0.10;
        const wpartying = 0.22;
        const wsmoking = 0.25;
        const wcleanliness = 0.18;

        var matchscore = 0;
        var score = 0;
        allscores = [];


        var dblength = users.length;

            for (let i = 0; i < dblength; i++) {

                matchscore = 0; //reset for each match

                //university
                if(req.user.university != (users[i].university)){
                    matchscore += -10;
                }

                //gender
                if(req.user.gender == (users[i].gender)){
                    score += 1.0;
                } else {
                    score += 0.1;
                }
                matchscore += (score*wgender);
                score = 0;


                //smoking
                if(req.user.smoking == (users[i].smoking)){
                    score += 1.0;
                } else {
                    score += 0.1;
                }
                matchscore += (score*wsmoking);
                score = 0;
            
                
                //pets
                if(req.user.pets == (users[i].pets)){
                    score += 1.0;
                } else {
                    score += 0.1;
                }
                matchscore += (score*wpets);
                score = 0;


                //partying
                score = 1.0 - (Math.abs(req.user.partying - users[i].partying))/10;
                matchscore += (score*wpartying);
                score = 0;

                //cleanliness
                score = 1.0 - (Math.abs(req.user.cleanliness - users[i].cleanliness))/10;
                matchscore += (score*wcleanliness);
                score = 0;

                allscores.push(matchscore + " " + users[i].username);
            }//end of loop

        console.log(allscores.sort());
        //take second and third highest
        
        var firstmatch = (allscores[allscores.length - 2]).split(" ");
        var secondmatch = (allscores[allscores.length - 3]).split(" ");

        for (let i = 0; i < dblength; i++) {

            if(firstmatch[1] == (users[i].username)){
                var firstBio = users[i].bio;
                var firstFirstName = users[i].firstname;
                var firstLastName = users[i].lastname;
                var firstAge = users[i].age;
                var firstCooking = users[i].cooking;
                var firstCleanliness = users[i].cleanliness;
                var firstPartying = users[i].partying;
                var firstGender = users[i].gender;
                var firstUniversity = users[i].university;
                var firstSmoker = users[i].smoker;
                var firstPets = users[i].pets;
                var firstBudget = users[i].budget;
                var firstMaxdistance = users[i].maxdistance;
            }
            if(secondmatch[1] == (users[i].username)){
                var secondBio = users[i].bio;
                var secondFirstName = users[i].firstname;
                var secondLastName = users[i].lastname;
                var secondAge = users[i].age;
                var secondCooking = users[i].cooking;
                var secondCleanliness = users[i].cleanliness;
                var secondPartying = users[i].partying;
                var secondGender = users[i].gender;
                var secondUniversity = users[i].university;
                var secondSmoker = users[i].smoker;
                var secondPets = users[i].pets;
                var secondBudget = users[i].budget;
                var secondMaxdistance = users[i].maxdistance;
            }

        }

        //END OF CODE FOR MATCHING SCRIPT ------------------------------------------------------

        res.render("mainpage", {
            usersList: users,
            universityname: req.user.university,
            firstmatchname: firstmatch[1],
            firstmatchscore: (Math.round(100*firstmatch[0])/100)*100,
            secondmatchname: secondmatch[1],
            secondmatchscore: (Math.round(100*secondmatch[0])/100)*100,

            firstBio: firstBio,
            firstFirstName: firstFirstName,
            firstLastName: firstLastName,
            firstAge: firstAge,
            firstCooking: firstCooking,
            firstCleanliness: firstCleanliness,
            firstPartying: firstPartying,
            firstGender: firstGender,
            firstUniversity: firstUniversity,
            firstSmoker: firstSmoker,
            firstPets: firstPets,
            firstBudget: firstBudget,
            firstMaxdistance: firstMaxdistance,

            secondBio: secondBio,
            secondFirstName: secondFirstName,
            secondLastName: secondLastName,
            secondAge: secondAge,
            secondCooking: secondCooking,
            secondCleanliness: secondCleanliness,
            secondPartying: secondPartying,
            secondGender: secondGender,
            secondUniversity: secondUniversity,
            secondSmoker: secondSmoker,
            secondPets: secondPets,
            secondBudget: secondBudget,
            secondMaxdistance: secondMaxdistance,
        })
    })

});

app.post("/mainpage", (req, res) => {
});



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