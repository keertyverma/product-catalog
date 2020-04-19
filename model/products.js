const mongoose = require("mongoose"),
    Joi = require("joi");

// create Product schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    model_number: { type: String, required: true },
    price: { type: Number, required: true },
    details: { type: String, default: "" }
})

const productModel = mongoose.model("products", productSchema, "products")

const validateProduct = product => {
    const scheme = {
        name: Joi.string().required(),
        category: Joi.string().required(),
        model_number: Joi.string().required(),
        price: Joi.number().required(),
        details: Joi.string().allow("")
    };

    return Joi.validate(product, scheme);
};

module.exports = { productModel, validateProduct };