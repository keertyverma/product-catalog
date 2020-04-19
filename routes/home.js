const express = require("express"),
    router = express.Router();

router.get("/", (req, res) => {
    res.send("Product Catalog");
})


module.exports = router;