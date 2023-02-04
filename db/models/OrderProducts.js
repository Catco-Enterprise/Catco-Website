const client = require("../client");

async function getOrderProductsByOrderId(id) {
	try {
		const {
			rows: [order_product],
		} = await client.query(`
      SELECT *
      FROM order_products
      WHERE "orderId" =  ${id}
      `);

		return order_product;
	} catch (error) {
		throw error;
	}
}

async function addProductToOrder({ orderId, productId, quantity, price }) {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
        INSERT INTO order_products("orderId", "productId", quantity, price)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT ("orderId", "productId") DO NOTHING
        RETURNING *;
        `,
			[orderId, productId, quantity, price]
		);

		return product;
	} catch (error) {
		console.error("Error adding product to order", error);
	}
}

async function updateOrderProductQty(orderId, productId, quantity) {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
			UPDATE order_products
			SET quantity = $1
			WHERE "orderId" = $2 AND "productId" = $3
			RETURNING *;
		`,
			[quantity, orderId, productId]
		);

		return product;
	} catch (error) {
		console.error("BE: Error updating order product quantity: ", error);
	}
}

async function destroyOrderProduct(orderId, productId) {
	try {
		const {
			rows: [product],
		} = await client.query(
			`
			DELETE FROM order_products
			WHERE "orderId" = $1 AND "productId" = $2
			RETURNING *;
		`,
			[orderId, productId]
		);

		return product;
	} catch (error) {
		console.error("BE: Error updating order product quantity: ", error);
	}
}

module.exports = {
	getOrderProductsByOrderId,
	addProductToOrder,
	updateOrderProductQty,
	destroyOrderProduct,
};
