const express = require("express"),
    homeRouter = require("./../routes/home"),
    productRouter = require("./../routes/product");

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api/v1", homeRouter);
    app.use("/api/v1/products", productRouter);

}