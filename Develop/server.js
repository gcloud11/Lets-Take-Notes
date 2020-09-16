
//Setting up dependenices 
const express = require("express");
const path = require("path");
const fs = require('fs');

// Setting up express server
const app = express();
const PORT = 4040;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notesArray = [];

app.get("/api/notes", function(req, res) {
    
});

// HTML GET Routes
//Renders notes home page back to client
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Renders notes page once get started is pressed
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.json(__dirname, "db/db.json"));
  });


// Listner
app.listen(PORT, function () {
    console.log("App is listening on PORT: " + PORT);
});