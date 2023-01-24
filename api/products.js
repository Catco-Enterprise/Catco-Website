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

module.exports = router;
