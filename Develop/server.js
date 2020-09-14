
//Setting up dependenices 
const express = require("express");
const path = require("path");
const fs = require('fs');

// Setting up express server
const app = express();
const PORT = 4000;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// GET Routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./Develop/index.html"));
});

app.get("/api/notes", function (req, res) {
    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            return res.json(JSON.parse(data));
        });
});