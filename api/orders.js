const express = require("express");
const { Orders, OrderProducts } = require("../db");
const router = express.Router();

// GET: api/orders/:id

router.get("/:id", async (req, res, next) => {
	try {
		res.send(await Orders.getAllOrdersByUserId());
	} catch (error) {
		console.error("Error fetching orders from db: ", error);
	}
});

router.post("/:id/products", async ( req, res, next) => {
	const activeOrder = await Orders.getActiveOrderByUserId(req.params.id)
	
	try {
		
		if(activeOrder.id) {
			res.send(await OrderProducts.addProductToOrder(req.body));
		}

		const newOrder = await createOrder();
		addProductToOrder(newOrder.id);


	} catch (error) {
		console.error("Error adding product to order from DB", error)
		
	}
})

module.exports = router;
