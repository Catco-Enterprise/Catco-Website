const express = require("express");
const router = express.Router();
const { Products } = require('../db')

// GET: api/products
router.get("/", async (req, res, next) => {
	try {
		res.send(await Products.getAllProducts());
	} catch (error) {
		console.error("Error fetching all products from db: ", error);
	}
});

router.get("/products/:id", async (req, res, next) => {
	try {
		res.send(await Products.getProductById());
	} catch (error) {
		console.error("Error fetching single product from db: ", error);
	}
});

router.post("/", async (req, res, next) => {
	const { name, description, stock, price } = req.body;

	try {
		res.send(await Products.createProduct({ name, description, stock, price }));
	} catch (error) {
		console.error("Error creating product ", error);
	}
});

module.exports = router;
