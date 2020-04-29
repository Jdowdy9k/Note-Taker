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

        const ranId = Math.floor((Math.random() * 100) + 1);

        let newNote =
        {
            id: ranId,
            title: req.body.title,
            text: req.body.text
        };

       
        fs.readFile(outputPath, (err, data) => {
            if (err) throw err;
            console.log(data);
            notesArray.push(newNote)


            fs.writeFile(outputPath, JSON.stringify(notesArray), function (err) {
                if (err) throw err;
                console.log('Saved!');
                res.send(notes_DB);
            });
         
        });
    });
    app.delete("/api/notes/:id", (req, res) => {
        var idChosen = req.params.id;
        fs.readFile(outputPath, (err, data) => {
            if (err) throw err;
            console.log(data);
            var notesArr = JSON.parse(data);
            var newNotesArr = notesArray.filter(notes => notes.id !== idChosen);
            fs.writeFile(outputPath, JSON.stringify(newNotesArr), function (err) {
                if (err) throw err;
                console.log('Saved!');
                res.send(notes_DB);
            });
        })
    })
}
