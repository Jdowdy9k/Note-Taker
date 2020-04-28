const path = require("path");
const fs = require("fs");
const notes_DB = require("../db/db.json")

const DB_DIR = path.resolve(___dirname, "../db");
const outPutpaths = paths.join(DB_DIR, "db.json");

let notesArray = notes_DB;

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        res.join(notes_DB);
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

        let finalObject = JSON.stringify(notesArray, null, 2);

        fs.writeFile(outputPath, finalObject, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Success! You've saved a note!");
            }
            res.json(finalObject);
        });

    });

    app.delete("/api/notes/:id", function (req, res) {

        var chosen = req.params.id;

        console.log(chosen);

        for (var i = 0; i < notesArray.length; i++) {
            if (chosen === notesArray[i].id) {
                notesArray.splice(i, 1);

                let finalObject = JSON.stringify(notesArray, null, 2);
                fs.writeFile(outputPath, finalObject, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(finalObject);
                        console.log("Success! You've deleted a note!");
                    }

                });

            }
        }


    });


};