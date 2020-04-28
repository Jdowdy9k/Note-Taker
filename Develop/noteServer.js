const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 7080

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log(" App listening on Port: " + PORT);
});

