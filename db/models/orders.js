const client = require("../client");
const { attachProductsToOrders } = require("./products");
const { getUserById } = require("./user");

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

async function updateOrderStatus(orderId, userId) {
	try {
		const {
			rows: [order],
		} = await client.query(
			`
		UPDATE orders
		SET "isActive" = false
		WHERE id = $1
		RETURNING *;`,
			[orderId]
		);

		console.log("this is a closed order: ", order);
		const newOrder = await createOrder(userId);
		console.log("this is newOrder: ", newOrder);
		return newOrder;
	} catch (error) {
		console.error("order model: updateOrderStatus error: ", error);
	}
}

module.exports = {
	getAllOrdersByUserId,
	getActiveOrderByUserId,
	createOrder,
	updateOrderStatus,
};
