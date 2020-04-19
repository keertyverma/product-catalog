const express = require("express"),
    winston = require("winston"),
    morgan = require("morgan");


const app = express();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

// Port configuration
const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`Listening on Port = ${port}`);
});

app.use(morgan("tiny"))