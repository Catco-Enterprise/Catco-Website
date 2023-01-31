const express = require("express");
const router = express.Router();
const { Orders } = require("../db");

router.get("/orders/:id", async (req, res, next) => {
	try {
		res.send(await Orders.getAllOrdersByUserId());
	} catch (error) {
		console.error("Error fetching orders from db: ", error);
	}
});

module.exports = router;
