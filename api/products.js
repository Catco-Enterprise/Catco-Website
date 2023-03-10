// const { response } = require("express");
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

// GET: api/products/:id
router.get("/:id", async (req, res, next) => {
	try {
		res.send(await Products.getProductById());
	} catch (error) {
		console.error("Error fetching single product from db: ", error);
	}
});

// DELETE: api/products/:id
router.delete('/:id', async (req, res, next) => {
	try {
		const { id } = req.params
		const deletedProduct = await Products.destroyProduct(id);
		res.send(deletedProduct);
	} catch (error) {
		console.error('API: Error deleting product');
		throw error;
	}
});

//PATCH: api/products/:id
router.patch('/:id', async (req, res, next) => {
	try {
		const { fields } = req.body
		const { id } = req.params
		const updatedProduct = await Products.updateProduct(id, fields);
		res.send(updatedProduct);
	} catch (error) {
		console.error('API: error with editing this product')
		throw error;

	}
})

//POST: api/products
router.post("/", async (req, res, next) => {
	const { name, description, stock, price, image } = req.body;

	try {
		res.send(await Products.createProduct({ name, description, stock, price, image }));
	} catch (error) {
		console.error("Error creating product ", error);
	}
});

module.exports = router;