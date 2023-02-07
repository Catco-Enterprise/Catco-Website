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

// POST: api/orders/:orderId/products
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

// PATCH: api/orders/:orderId/products
router.patch("/:orderId/products", async (req, res, next) => {
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
				const { productId, quantity } = req.body;
				const { orderId } = req.params;
				res.send(
					await OrderProducts.updateOrderProductQty(
						orderId,
						productId,
						quantity
					)
				);
			}
		} catch (error) {
			console.error("BE: Error updating order product quantity: ", error);
		}
	}
});

// DELETE: api/orders/:orderId/products/:productId
router.delete("/:orderId/products/:productId", async (req, res, next) => {
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
		console.log("api orders: token: ", token);
		try {
			const { id } = jwt.verify(token, JWT_SECRET);
			if (id) {
				const { orderId, productId } = req.params;
				res.send(await OrderProducts.destroyOrderProduct(orderId, productId));
			}
		} catch (error) {
			console.error("BE: Error deleting order product: ", error);
		}
	}
});

router.patch("/:orderId", async (req, res, next) => {
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
			if(id) {
				const { orderId } = req.params;
				const newOrder = await Orders.updateOrderStatus(orderId, id)
				console.log("API: this is the new order: ", newOrder);
				res.send(newOrder);
			}
        } catch (error) {
	      console.error("BE: Error updating order status: ", error);
        }
	}
});

module.exports = router;
