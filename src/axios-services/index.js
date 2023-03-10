import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

export async function login(email, password) {
	const { data } = await axios.post("/api/users/login", {
		email: email,
		password: password,
	});
	console.log("user @ FE login function: ", data);
	return data;
}

//change this to return the token, rather than the user w/ token attached
export async function register(email, password) {
	const { data } = await axios.post("/api/users/register", {
		email: email,
		password: password,
	});

	return data;
}

export async function getUser(token) {
	// Headers are added as a second parameter to axios.get()
	const { data: user } = await axios.get("/api/users/me", {
		headers: { Authorization: `Bearer ${token}` },
	});

	return user;
}

export async function getAllUsers() {
	try {
		const { data: users } = await axios.get("/api/users/getAll");
		return users;
	} catch (error) {
		console.log("Error fetching all users");
	}
}

export async function getAPIHealth() {
	try {
		const { data } = await axios.get("/api/health");
		return data;
	} catch (err) {
		console.error(err);
		return { healthy: false };
	}
}

export async function getProducts() {
	try {
		// console.log("frontend api")
		const { data: products } = await axios.get("/api/products");
		console.log("wwwwwwwwwwwwwwwwwwwww", products)

		return products;
	} catch (error) {
		console.error("Error fetching products...", error);
		throw error;
	}
}

export async function getSingleProduct(id) {
	try {
		// console.log('just adda message')
		const { data } = await axios.get(`/api/products/${id}`);
		console.log(data);
		// console.log(data.id)
		return data;
	} catch (error) {
		console.error("error in getting single product");
		throw error;
	}
}

export async function fetchMe(token) {
	try {
		const { data } = await axios.get("/api/users/me", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function createProduct(name, description, stock, price) {
	const { data: product } = await axios.post("/api/products", {
		name: name,
		description: description,
		stock: stock,
		price: price,
	});

	return product;
}

export async function patchProduct(id, fields) {
	const { data: product } = await axios.patch(`/api/products/${id}`, {
		fields,
	});

	return product;
}

export async function deleteProduct(id) {
	try {
		const { data } = await axios.delete(`/api/products/${id}`);
	} catch (error) {
		console.error("Axios: error deleting product");
		throw error;
	}
}

export async function fetchActiveOrder(token) {
	try {
		const { data } = await axios.get("api/users/me/activeOrder", {
			headers: { Authorization: `Bearer ${token}` },
		});

		return data;
	} catch (error) {
		console.error("Axios, error fetching active orders", error);
	}
}

export async function addProductToActiveOrder(
	activeOrderId,
	productToAdd,
	token
) {
	try {
		const result = await axios.post(
			`/api/orders/${activeOrderId}/products`,
			productToAdd,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		console.log(result);
	} catch (error) {
		console.error("FE: Error adding product to active order: ", error);
	}
}

export async function patchOrderProductQty(
	token,
	activeOrderId,
	productId,
	quantity
) {
	try {
		const result = await axios.patch(
			`/api/orders/${activeOrderId}/products`,
			{ productId: productId, quantity: quantity },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		console.log(result);
	} catch (error) {
		console.error("FE: error patching order product qty: ", error);
	}
}

export async function deleteOrderProduct(token, activeOrderId, productId) {
	console.log(
		"axios services: deleteOrderProduct arguments: ",
		token,
		activeOrderId,
		productId
	);
	try {
		const result = await axios.delete(
			`/api/orders/${activeOrderId}/products/${productId}`,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		console.log(result);
	} catch (error) {
		console.error("FE: error deleting order product: ", error);
	}
}
