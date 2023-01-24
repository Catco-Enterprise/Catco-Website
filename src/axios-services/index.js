import axios from "axios";
import e from "express";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

export async function registerUser(email, password) {
	try {
		const response = await axios.post("/api/register", {
			email: email,
			password: password,
		});
		return response;
	} catch (error) {}
}

export async function login(email, password) {
	try {
		const response = await axios.post("/api/login", {
			method: "Post",
			headers: {
				"content-type": "application/json",
			},
			body: json.stringify({ email: email, password: password }),
		});

		return await response.json();
	} catch (error) {}
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

export async function fetchUser() {
	try {
		// const response = await axios.get("/api/users/me", {});
	} catch (err) {
		console.error(err);
	}
}

export async function getProducts() {
	try {
		// console.log("frontend api")
		const { data: products } = await axios.get("/api/products");
		// console.log("this is my response..", response)
		return products;
	} catch (error) {
		console.error("Error fetching products...", error);
		throw error;
	}
}
