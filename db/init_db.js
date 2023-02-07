const { createUser } = require("./models/user");
const {
	client,
} = require("./");
const { createProduct } = require("./models/products");

async function dropTables() {
	try {
		console.log("Dropping all tables!!!!!");

		await client.query(`
		DROP TABLE IF EXISTS order_products;
		DROP TABLE IF EXISTS orders;
    	DROP TABLE IF EXISTS products;
		DROP TABLE IF EXISTS users;
    `);

		console.log("Finished dropping tables!!!!!");
	} catch (error) {
		console.error("ERROR DROPPING TABLES!!!!!");
	}
}

async function createTables() {
	try {
		console.log("Starting to create tables!!!!!");

		await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
	  "isAdmin" BOOLEAN DEFAULT false
    );

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255) NOT NULL,
      price NUMERIC NOT NULL,
	  image TEXT,
      stock INTEGER
    );
	
    CREATE TABLE orders (
		id SERIAL PRIMARY KEY,
		"userId" INTEGER REFERENCES users(id),
		"isActive" BOOLEAN DEFAULT TRUE,
		purchased_date DATE
	);
	  
	CREATE TABLE order_products (
		id SERIAL PRIMARY KEY,
		"orderId" INTEGER REFERENCES orders(id),
		"productId" INTEGER REFERENCES products(id),
		quantity INTEGER,
		price NUMERIC NOT NULL,
		UNIQUE ("orderId", "productId")
	);
    `);
		console.log("Finished creating tables!!!!!");
	} catch (error) {
		console.error("ERROR CREATING TABLES!!!!!");
		throw error;
	}
}


async function populateInitialData() {
	try {

		const usersToCreate = [
			{ email: "albert@gmail.com", password: "bertie99" },
			{ email: "sandra@gmail.com", password: "sandra123" },
			{ email: "glamgal@gmail.com", password: "glamgal123" },
			{ email: "admin@catco.com", password: "admin123", isAdmin: true },
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
			name: "SO PHRESH Cat Litter",
			description: "So Phresh Advanced Odor Control Scoopable Fragrance Free Cat Litter, 16 lbs.",
			price: 10.99,
			image: `https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_bypetco-badge,fl_relative,w_0.20,g_south_east,e_sharpen/2297792-center-1`,
			stock: 10,
		},
		{
			name: "So Presh Cat Litter Box",
			description: `So Phresh Disposable Litter Box Set, 16.7" L X 12.6" W X 4.3`,
			price: 9.99,
			image: 'https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_bypetco-badge,fl_relative,w_0.20,g_south_east,e_sharpen/2880208-center-1',
			stock: 50,
		},
		{
			name: "Fancy Feast",
			description: "Fancy Feast Limited Ingredient Savory Cravings Beef & Crab Flavor Cat Treats, 16 oz",
			price: 20.99,
			image: 'https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/3017924-center-1',
			stock: 5,
		},
		{
			name: "Cat Teaser",
			description: `Leaps & Bounds Caterpillar Cat Teaser, 33" L`,
			price: 8.46,
			image: 'https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_sale-badge,fl_relative,w_0.12,g_north_west,e_sharpen/l_bypetco-badge,fl_relative,w_0.20,g_south_east,e_sharpen/2312091-center-1',
			stock: 14,
		},
		{
			name: "Convertible Cat Bed",
			description: `EveryYay Snooze Fest 2 in 1 Novelty Pyramid Convertible Cat Bed, 16" L X 16" W`
			,
			price: 39.99,
			image: 'https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_sale-badge,fl_relative,w_0.12,g_north_west,e_sharpen/l_bypetco-badge,fl_relative,w_0.20,g_south_east,e_sharpen/3124287-center-2',
			stock: 1,
		},
	];

	console.log("Starting to create products");

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
