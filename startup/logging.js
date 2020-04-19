const winston = require("winston")

module.exports = function () {
    // logging errors
    winston.add(new winston.transports.File({ filename: "logfile.log" }));
    winston.add(new winston.transports.Console, {

        prettyPrint: true,
        colorize: true
    });

    // handles uncaught exceptions and promise rejections
    winston.exceptions.handle(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: "uncaughtException.log" }));

    process.on("unhandledRejection", (ex) => {
        throw ex;
    });



}