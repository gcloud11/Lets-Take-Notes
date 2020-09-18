// Express is used to interact with the front end
const express = require("express");
// Path is used for filename paths
const path = require("path");
// fs is used to read and write to files
const fs = require("fs");

// Express server created here
const app = express();
// Sets an Initial port for listeners
const PORT = process.env.PORT || 4040;

//Start notes

let notesArray = [];

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// ROUTES

// Api call response for all the notes, and sends the results to the browser as an array of object

app.get("/api/notes", function(err, res) {
  try {
    // Reads the notes from db.json file
    notesArray = fs.readFileSync("./db/db.json", "utf8");

    // Parse it so notesArray is an array of objects
    notesArray = JSON.parse(notesArray);

    // Error handling
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  //   Send objects to the browser
  res.json(notesArray);
});

// Writes the new note to the db.json file
app.post("/api/notes", function(req, res) {
  try {
    // Reads the db.json file
    notesArray = fs.readFileSync("./db/db.json", "utf8");
    console.log(notesArray);

    // Parse the notes to get an array of objects
    notesArray = JSON.parse(notesArray);
    // Set notes ids
    req.body.id = notesArray.length;
    // Add the new note to the array of note objects
    notesArray.push(req.body); 

    //Stringify notes to to be able to write to db file
    notesArray = JSON.stringify(notesArray);
    // Writes the new note to db file
    fs.writeFile("./db/db.json", notesArray, "utf8", function(err) {
      // Error handling
      if (err) throw err;
    });

     // Notes are changed back to an array of objects and sent back to the browser
    res.json(JSON.parse(notesArray));

    // error Handling
  } catch (err) {
    throw err;
    console.error(err);
  }
});

// Delete a note

app.delete("/api/notes/:id", function(req, res) {
  try {
    //  reads the json file
    notesArray = fs.readFileSync("./db/db.json", "utf8");
    // Parse the notes to get an array of the objects
    notesArray = JSON.parse(notesArray);
    // Delete the old note from the array of note objects
    notesArray = notesArray.filter(function(note) {
      return note.id != req.params.id;
    });
   
    //Stringify notes to to be able to write to db file
    notesArray = JSON.stringify(notesArray);
    // Write the new notes to the db file
    fs.writeFile("./db/db.json", notesArray, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });

    // Notes are changed back to an array of objects and sent back to the browser
    res.send(JSON.parse(notesArray));

    // error handling
  } catch (err) {
    throw err;
    console.log(err);
  }
});

// HTML GET Requests

// Notes page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function(req, res) {
  return res.sendFile(path.json(__dirname, "./db/db.json"));
});

// Starts server
app.listen(PORT, function() {
  console.log("Server listening on port " + PORT);
});
