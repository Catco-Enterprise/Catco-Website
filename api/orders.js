const express = require("express");
const router = express.Router();

// GET: api/orders/:id

router.get("/:id", async (req, res, next) => {
    try {
        res.send(await orders.getOrderById());
    } catch (error) {
        console.error("Error fetching orders from db: ", error);
    }
});

module.exports = router;