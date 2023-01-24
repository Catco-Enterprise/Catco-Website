const express = require("express");
const router = express.Router();
import { Products } from "../db";

router.get("/products", async (req, res, next) => {
	try {
		res.send(await Products.getAllProducts());
	} catch (error) {
		console.error("Error fetching all products from db: ", error);
	}
});

module.exports = router;
