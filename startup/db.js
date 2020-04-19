const config = require("config"),
    mongoose = require("mongoose"),
    winston = require("winston");


module.exports = function () {
    let dbConnectionUrl = config.get("dbConnectionString");

    mongoose
        .connect(dbConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => winston.info("Connected to Database"))
        .catch(err => winston.error("Cannot connect to db"));


}
