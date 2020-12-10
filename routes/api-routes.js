// These are all of our backend api routes


// Import our DB schema models so we can get or put stuff in the DB
// Import passport so we can authenticate users at login
var db = require("../models");
const passport = require("../config/passport");


module.exports = function (app) {

    // POST route to login a user after authenticating them ------------------------------------------------------------
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.body);
    });


    // POST register route, creates new user in DB ------------------------------------------------------------
    app.post("/api/register", function (req, res) {
        console.log(req.body);

        // creating new user and then logging them in
        db.User.create(req.body).then(function () {
            res.redirect(307, "/api/login");
        }).catch(err => {
            res.status(401).json(err);
        });
    });


    // POST song route, creates new song entry in DB ------------------------------------------------------------
    app.post("/api/addSong", function (req, res) {
        console.log(req.body);
        db.Song.create(req.body).then(function (post) {
            res.json(post);
        });

    });

    // Route for logging user out ------------------------------------------------------------
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });


    // Route for getting some data about our user to be used on front end ------------------------------------------------------------
    app.get("/api/user_data", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's username and id
            res.json({
                username: req.user.username,
                id: req.user.id
            });
        }
    });

    // Route for getting specific user's music ------------------------------------------------------------
    app.get("/api/songs/:id", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's username and id
            db.Songs.findAll({
                where: {
                    UserId: req.params.id
                }
            }).then(function (dbSong) {

                res.json(dbSong);
            });
        }
    });


    // GET route to get user based on id parameter ------------------------------------------------------------
    app.get("/api/users/:id", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's username and id
            db.User.findAll({
                where: {
                    id: req.params.id
                }
            }).then(function (dbUser) {

                res.json(dbUser);
            });
        }
    });

    // GET route to get music from DB for the global feed ------------------------------------------------------------
    app.get("/api/feed", (req, res) => {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            db.Show.findAll({ include: db.User }).then(function (dbSong) {
                res.json(dbSong);
            });
        }
    });




};

