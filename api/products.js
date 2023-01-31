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

router.delete('/products/:id', async (req, res, next) => {
	try {
		const productId = req.params.id;
		const deletedProduct = await Products.deleteProduct(productId);

		res.send(deletedProduct);
	} catch (error) {
		console.error('API: Error deleting product');
		throw error;
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
