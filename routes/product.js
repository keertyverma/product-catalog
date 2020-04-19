const express = require("express"),
    router = express.Router(),
    { productModel, validateProduct } = require("./../model/products");

// get all
async function getAllProduct(req, res) {
    try {

        allProducts = await productModel.find().sort("name");
        if (allProducts.length === 0) {
            return res.status(404).send({
                code: 404,
                message: "No data found"
            })
        }
        res.send(allProducts);
    } catch (ex) {
        console.log(ex);
        return res.status(500).send({
            code: 500,
            message: 'Internal server error'
        });
    }
}

// get by ID
async function getProductById(req, res) {
    try {
        let productId = req.params.id;
        let product = [];

        product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).send({
                code: 404,
                message: `No Product found with ID = ${productId}`
            });
        }
        res.send(product);

    } catch (ex) {
        console.log(ex);
        return res.status(500).send({
            code: 500,
            message: 'Internal server error'
        });
    }
}

// post
async function addProduct(req, res) {
    try {
        const { error } = validateProduct(req.body);
        // 400 - Bad request
        if (error) {
            return res.status(400).send({
                code: 400,
                message: error.details[0].message.replace(/"/g, '\'')
            });
        }
        let product = new productModel({
            name: req.body.name,
            category: req.body.category,
            model_number: req.body.model_number,
            price: req.body.price,
            details: req.body.details
        });
        product = await product.save();
        res.send(product);
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(
            {
                code: 500,
                message: 'Internal server error'
            }
        )
    }


}

// put
async function updateProduct(req, res) {
    try {
        const { error } = validateProduct(req.body);
        const productId = req.params.id;
        // 400 - Bad request
        if (error) {
            return res.status(400).send({
                code: 400,
                message: error.details[0].message.replace(/"/g, '\'')
            });
        }

        let product = {
            name: req.body.name,
            category: req.body.category,
            model_number: req.body.model_number,
            price: req.body.price,
            details: req.body.details
        };

        console.log(product);

        product = await productModel.findByIdAndUpdate(productId, { $set: product });
        if (!product) {
            return res.status(404).send({
                code: 404,
                message: `No Product found with ID = ${productId}`
            });
        }
        res.send(product);


    } catch (ex) {
        console.log(ex);
        return res.status(500).send(
            {
                code: 500,
                message: 'Internal server error'
            }
        )
    }

}

// delete
async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const product = await productModel.findByIdAndRemove(productId);
        if (!product) {
            return res.status(404).send({
                code: 404,
                message: `No Product found with ID = ${productId}`
            });
        }
        res.send(product);
    } catch (ex) {
        console.log(ex);
        return res.status(500).send(
            {
                code: 500,
                message: 'Internal server error'
            }
        )
    }

}

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
