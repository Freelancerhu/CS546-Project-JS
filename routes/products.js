var express = require('express');
var router = express.Router();
const data = require("../data");
const productData = data.products;


//List all products
router.get('/allproducts', function(req, res) {
    productData.getAllProducts().then((product) => {
        res.json(product);
    }).catch(() => {
        res.status(404).json({ error: "product not found" });
    });
});


//List product by id
router.get('/:id', function(req, res) {
    productData.getProductById(req.params.id).then((product) => {
        res.json(product);
    }).catch(() => {
        res.status(404).json({ error: "product not found" });
    });
});


module.exports = router;