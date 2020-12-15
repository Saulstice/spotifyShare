Spotifly - Share the music you love

Allows users to share music with other users and for users to save songs to their own libraries.

https://morning-springs-72878.herokuapp.com/
(Need to create a username and password)

We have designed our product to work with IOS14 since the designers are apple users. As well it should work on Chrome, meaning the website will work for most androids.

User Manual:
https://github.com/Saulstice/spotifyShare/blob/main/docs/final.md

Developer Manual:

Creating a fork from Github, installing this application is similar to installing any other folder from Github. After downloading the files, in the folder, type "npm i" to install all the dependencies that are required for the project.

This application utilizes a localhost port for development and testing. So, the local port 3306 must enable mySQL to run. When this application is used with heroku in post-production it utilizes jawsdb which is allows for mysql databases on Heroku.

To run any tests of the software, type "npm test". We have enabled a debugger to run when this script is run.

app.post("/api/login"... -> this post logins user after authenticating them
app.post("/api/register" -> this post registers a new user
app.post("/api/addSong" -> this creates a song entry in the DB
app.post("/api/sendRec" -> this creates a new recommendation entry in the DB

app.get("/api/recs/:id" -> this retrieves a recommendation from the DB
app.get("/logout" -> this logs out the user
app.get("/api/user_data" -> retrieving user data for front-end
app.get("/api/songs/:id" -> gets specific users music
app.get("/api/oneSong/:id" -> this finds the song from the feed
app.get("/api/users/:username" -> gets the user parameters based on user
app.get("/api/feed" -> gets the music from the DB for the global feed

For future dvelopment, expanding the database design to incoporate a network that utilizes nodes and connections to have "friends".


