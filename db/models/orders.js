const client = require("../client");

async function createOrder() {
	try {
		const { rows: order } = await client.query(
			`
        INSERT INTO orders("userId","isActive",purchased_date)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `[(userId, isActive, purchased_date)]
		);

		return order;
	} catch (error) {
		throw error;
	}
}

async function getAllOrdersByUserId(userId) {
	try {
		const {
			rows: [order],
		} = await client.query(`
      SELECT *
      FROM orders
      WHERE "userId" =  ${userId}
      `);

		return order;
	} catch (error) {
		throw error;
	}
}

async function getActiveOrderByUserId(id) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
      SELECT orders.*, users.email AS "userAcc"
      FROM orders
      JOIN order_products ON orders.id = order_products."orderId"
      WHERE order_products."productId" = $1 AND "isActive" = true
      `[id]
		);

		return attachProductsToOrders(order);
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getAllOrdersByUserId,
	getActiveOrderByUserId,
	createOrder,
};
