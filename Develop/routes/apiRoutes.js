const path = require("path");
const fs = require("fs");
const notes_DB = require("../db/db.json")

const DB_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(DB_DIR, "./db.json");

let notesArray = notes_DB;

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.json(notes_DB);
    });

    app.post("/api/notes", function (req, res) {

        if (notesArray.length === 0) {
            notesArray.push({
                "text": "",
                "text": "",
                "id": 0
            });
        }

        if (notesArray[0].title === "") {
            notesArray.shift();
        }

        notesArray.push(req.body);

        let finishNote = JSON.stringify(notesArray, null, 2);

        fs.writeFile(outputPath, JSON.stringify(notesArray), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Success! You've saved a note!");
            }
            res.json(finishNote);
        });

    });

    app.delete("/api/notes/:id", function (req, res) {

        var chosen = req.params.id;

        console.log(chosen);

        for (var i = 0; i < notesArray.length; i++) {
            if (chosen === notesArray[i].id) {
                notesArray.splice(i, 1);

                let finishNote = JSON.stringify(notesArray, null, 2);
                fs.writeFile(outputPath, finishNote, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(finishNote);
                        console.log("Success! You've deleted a note!");
                    }

                });

            }
        }


    });


};