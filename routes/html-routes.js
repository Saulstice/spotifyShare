// These are our HTML routes


// Require path so we can get specific directory paths for the URLs
const path = require("path");

// import middleware that check to see if user is logged in before allowing them access anything
const isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

    // Route to send authenticated user to home page ------------------------------------------------------------------------------------------------------------------------
    // if user is logged in send them to their personal page, otherwise send them to login page 
    app.get("/login", (req, res) => {
        // If the user already has an account send them to the home page
        if (req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // Route to send user to register page, but if they're already logged in send them to home page ------------------------------------------------------------------------------------------------------------------------
    app.get("/register", (req, res) => {
        if(req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../public/register.html"));
    });

    // Here we've add our isAuthenticated middleware to our routes. ------------------------------------------------------------------------------------------------------------------------
    // If a user who is not logged in tries to access these routes they will be redirected to the register/login page
    app.get("/home", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/feed", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/feed.html"));
    });

    app.get("/library", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/library.html"));
    });

    app.get("/recommend", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/recommend.html"));
    });
}