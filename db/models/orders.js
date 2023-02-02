const client = require("../client");
const { attachProductsToOrders } = require("./products");

async function createOrder(userId) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
        INSERT INTO orders("userId")
        VALUES ($1)
        RETURNING *;
        `,
			[userId]
		);
		console.log("order @ createOrder: ", order);
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
      SELECT *
      FROM orders
      WHERE orders."userId" = $1 AND "isActive" = true;
      `,
			[id]
		);
		// did we need this query for something else??:

		// const {
		// 	rows: [order],
		// } = await client.query(
		// 	`
		//   SELECT orders.*, users.email AS "userAcc"
		//   FROM orders
		//   JOIN order_products ON orders.id = order_products."orderId"
		//   WHERE order_products."productId" = $1 AND "isActive" = true;
		//   `,
		// 	[id]
		// );
		if (order.id) {
			const [activeOrder] = await attachProductsToOrders([order]);
			return activeOrder;
		} else {
			return await createOrder(id);
		}
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getAllOrdersByUserId,
	getActiveOrderByUserId,
	createOrder,
};
