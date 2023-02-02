const client = require("../client");

//eventually make it so only admin can create a product
async function createProduct({ name, description, price, stock }) {
	try {
		const { rows: [products] } = await client.query(`
      INSERT INTO products (name, description, price, stock)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [name, description, price, stock]);
		return products;
	} catch (error) {
		console.error("createProduct: error creating product: ", error);
	}
}

async function destroyProduct(id) {
	try {
		await client.query(`
		DELETE from products
		WHERE id = ${id}
		`);

	} catch (error) {
		console.error('Error deleting product');
		throw error;
	}
}

async function getAllProducts() {
	try {
		const { rows: products } = await client.query(`
      SELECT *
      FROM products;
    `);
		return products;
	} catch (error) {
		console.error("getAllProducts: error getting all products: ", error);
	}
}

async function getProductById(id) {
	try {
		const { rows: [product] } = await client.query(`
	  SELECT *
	  FROM products
	  WHERE id =  ${id}
	  `);

		return product;
	} catch (error) {
		throw error;
	}
}

async function attachProductsToOrders(products) {
	const ordersToReturn = [...orders]

	try {
		const { rows: products } = await client.query(`
		SELECT products.*, order_products.id AS "orderProductId"
		, order_products."orderId", order_products.quantity, order_products.price
		FROM products
		JOIN order_products ON order_products."productId" = products.id
		`)

		for (const order of ordersToReturn) {
			const productsToAdd = products.filter(
				(product) => product.orderId === order.id
			);
			order.products = productsToAdd;
		}
		return ordersToReturn;
	} catch (error) {
		throw error;
	}
}


async function updateProduct(id, name, description, stock, price) {
	try {
		// CREATE TABLE products (
		// 	id SERIAL PRIMARY KEY,
		// 	name VARCHAR(255) UNIQUE NOT NULL,
		// 	description VARCHAR(255) NOT NULL,
		// 	price NUMERIC NOT NULL,
		// 	stock INTEGER
		//   );
		const updateQuery = `UPDATE products SET
		name = '${name}',
		description = '${description}',
		stock = ${stock},
		price = ${price}
		WHERE id = ${id}
		RETURNING *`;

		const { rows: product } = await client.query(updateQuery);

		return product;
	} catch (error) {
		console.error('DB: Error updating product');
		throw error;
	}
}

module.exports = {
	createProduct,
	destroyProduct,
	getAllProducts,
	getProductById,
	attachProductsToOrders,
	updateProduct
};