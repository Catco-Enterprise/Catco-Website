import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Cart from "./Cart";
import Products from "./Products";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
// import { getProducts } from '../axios-services';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getProducts, fetchMe } from "../axios-services";
import "../style/App.css";
import Register from "./Register";
import { useStateDispatch } from "../StateContext";
import SingleProduct from "./SingleProduct";
import Admin from "./Admin";

const App = () => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState(
		JSON.parse(localStorage.getItem("cartItems"))
	);
	const [APIHealth, setAPIHealth] = useState("");

	//
	useEffect(() => {
		// follow this pattern inside your useEffect calls:
		// first, create an async function that will wrap your axios service adapter
		// invoke the adapter, await the response, and set the data
		const getAPIStatus = async () => {
			const { healthy } = await getAPIHealth();
			setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
		};

		// second, after you've defined your getter above
		// invoke it immediately after its declaration, inside the useEffect callback
		getAPIStatus();

		const getAllProducts = async () => {
			const allProducts = await getProducts();
			setProducts(allProducts);
		};
		getAllProducts();
	}, []);

	useEffect(() => {
		// const token = localStorage.getItem('token');
		const getMe = async () => {
			const userObj = await fetchMe(token);
			setUser(userObj);
			// localStorage.setItem("user", JSON.stringify(userObj));
		};

		if (token) {
			getMe();
			setIsLoggedIn(true);
		}

		// const cachedCartItems = JSON.parse(localStorage.getItem('cartItems'));

		// if (cachedCartItems) {
		//   setCartItems(cachedCartItems);
		// }
	}, [token]);

	console.log("---------------STATE (App)---------------");
	console.log("APIHealth: ", APIHealth);
	console.log("token: ", token);
	console.log("user: ", user);
	console.log("isLoggedIn: ", isLoggedIn);
	console.log("products: ", products);
	console.log("cartItems: ", cartItems);
	console.log("-----------------------------------------");

	return (
		<div className="app-container">
			<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/products"
					element={
						<Products
							products={products}
							cartItems={cartItems}
							setCartItems={setCartItems}
						/>
					}
				/>
				<Route
					path="/Login"
					element={
						<Login
							token={token}
							setToken={setToken}
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
						/>
					}
				/>
				<Route
					path="/Cart"
					element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
				/>
				<Route
					path="/products/:id"
					element={<SingleProduct products={products} />}
				/>
				<Route
					path="/Register"
					element={
						<Register
							token={token}
							setToken={setToken}
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
						/>
					}
				/>
				<Route
					path="/admin"
					element={<Admin currentUser={currentUser} products={products} />}
				/>
			</Routes>
		</div>
	);
};

export default App;
