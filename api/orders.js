const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { Orders, OrderProducts } = require("../db");

// GET: api/orders/:id

router.get("/:id", async (req, res, next) => {
	try {
		res.send(await Orders.getAllOrdersByUserId());
	} catch (error) {
		console.error("Error fetching orders from db: ", error);
	}
});

router.post("/:orderId/products", async (req, res, next) => {
	console.log(req.body);
	const prefix = "Bearer ";
	const auth = req.header("Authorization");

	if (!auth) {
		res.statusCode = 401;
		next({
			name: "unauthorize error",
			message: "youre not logged in",
		});
	} else if (auth.startsWith(prefix)) {
		const token = auth.slice(prefix.length);
		try {
			const { id } = jwt.verify(token, JWT_SECRET);
			if (id) {
				const productToAdd = {
					orderId: req.params.orderId,
					productId: req.body.id,
					quantity: req.body.quantity,
					price: req.body.price,
				};
				console.log(productToAdd);
				res.send(await OrderProducts.addProductToOrder(productToAdd));
			}
		} catch (error) {
			console.error("BE: Error adding product to order: ", error);
		}
	}
});

module.exports = router;
