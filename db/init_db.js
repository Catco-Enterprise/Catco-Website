const { createUser } = require("./models/user");
const {
	client,
	// declare your model imports here
	// for example, User
} = require("./");
const { createProduct } = require("./models/products");

async function dropTables() {
	try {
		console.log("Dropping all tables!!!!!");

		await client.query(`
    	DROP TABLE IF EXISTS users;
    	DROP TABLE IF EXISTS products;
		DROP TABLE IF EXISTS orders;
		DROP TABLE IF EXISTS order_products
    `);

		console.log("Finished dropping tables!!!!!");
	} catch (error) {
		console.error("ERROR DROPPING TABLES!!!!!");
	}
}

async function createTables() {
	try {
		// client.connect();
		console.log("Starting to create tables!!!!!");

		await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price NUMERIC NOT NULL,
      stock INTEGER
    );
	
    CREATE TABLE orders (
		id SERIAL PRIMARY KEY,
		"userId" INTEGER REFERENCES users(id),
		"isActive" BOOLEAN DEFAULT FALSE,
		purchased_date DATE NOT NULL
	);
	  
	CREATE TABLE order_products (
		id SERIAL PRIMARY KEY,
		"orderId" INTEGER REFERENCES orders(id),
		"productId" INTEGER REFERENCES products(id),
		quantity INTEGER,
		price NUMERIC NOT NULL
		UNIQUE ("orderId", "productId")
	);
    `);
		// look into how to have images in the db for products
		console.log("Finished creating tables!!!!!");
	} catch (error) {
		console.error("ERROR CREATING TABLES!!!!!");
		throw error;
	}
}

//lets maybe change the name of this function to createInitialUsers or something similar
async function populateInitialData() {
	try {
		// create useful starting data by leveraging your
		// Model.method() adapters to seed your db, for example:
		// const user1 = await User.createUser({ ...user info goes here... })
		const usersToCreate = [
			{ email: "albert@gmail.com", password: "bertie99" },
			{ email: "sandra@gmail.com", password: "sandra123" },
			{ email: "glamgal@gmail.com", password: "glamgal123" },
		];
		const users = await Promise.all(usersToCreate.map(createUser));

		console.log("Users created:");
		console.log(users);
		console.log("Finished creating users!");
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function createInitialProducts() {
	const productsToCreate = [
		{
			name: "prod1",
			description: "this is prod1",
			price: 10.99,
			stock: 10,
		},
		{
			name: "prod2",
			description: "this is prod2",
			price: 5.99,
			stock: 50,
		},
		{
			name: "prod3",
			description: "this is prod3",
			price: 20.99,
			stock: 5,
		},
		{
			name: "prod4",
			description: "this is prod4",
			price: 1.5,
			stock: 14,
		},
		{
			name: "prod5",
			description: "this is prod5",
			price: 100.0,
			stock: 1,
		},
	];

	console.log("Starting to create products");
	//map each into a createProduct function to Insert Into db
	const products = await Promise.all(productsToCreate.map(createProduct));
	console.log("Products created: ", products);
}

async function rebuildDB() {
	try {
		await client.connect();
		await dropTables();
		await createTables();
		await populateInitialData();
		await createInitialProducts();
	} catch (error) {
		console.log("Error during rebuildDB");
		throw error;
	}
}

rebuildDB()
	.catch(console.error)
	.finally(() => client.end());
