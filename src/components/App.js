import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Cart from "./Cart";
import Products from "./Products";
import Login from "./Login";
import Confirmation from "./Confirmation";
import { Routes, Route } from "react-router-dom";
// import { getProducts } from '../axios-services';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import {
	getAPIHealth,
	getProducts,
	fetchMe,
	// fetchActiveOrder,
} from "../axios-services";
import "../style/App.css";
import Register from "./Register";
import SingleProduct from "./SingleProduct";
import Admin from "./Admin";
import EditProducts from "./EditProducts";
// import ReactDOM from "react-dom";
import Footer from "./Footer";
import Checkout from "./Checkout";

const App = () => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
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

		if (localStorage.getItem("cartItems")) {
			setCartItems(JSON.parse(localStorage.getItem("cartItems")));
		}
	}, []);

	useEffect(() => {
		const getMe = async () => {
			const userObj = await fetchMe(token);
			setUser(userObj);

			const activeOrderProducts = userObj.activeOrder.products;
			const storedOrderProducts = JSON.parse(localStorage.getItem("cartItems"));

			if (
				!activeOrderProducts.length &&
				storedOrderProducts &&
				storedOrderProducts.length
			) {
				setCartItems(storedOrderProducts);
			} else {
				localStorage.setItem("cartItems", JSON.stringify(activeOrderProducts));
				setCartItems(activeOrderProducts);
			}
		};

		if (!user.id && token) {
			getMe();
			setIsLoggedIn(true);
		}
	}, [token]);

	//this is bad- fix later
	useEffect(() => {
		const getMe = async () => {
			const userObj = await fetchMe(token);
			setUser(userObj);
		};
		getMe();
	}, [cartItems]);
	//above is bad- fix later

	function resetState() {
		setToken(localStorage.getItem("token"));
		setUser({});
		setIsLoggedIn(false);
		setCartItems([]);
	}

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
			<Navbar isLoggedIn={isLoggedIn} resetState={resetState} />
			<Routes>
				<Route path="/" element={<Home setToken={setToken}
				setUser={setUser}
				setIsLoggedIn={setIsLoggedIn}
				setCartItems={setCartItems}/>} />
				<Route path="/confirmation" element={<Confirmation />} />
				<Route path="/Checkout" element={<Checkout 
				            activeOrder={user.activeOrder}
							cartItems={cartItems}
							setCartItems={setCartItems}
							userId={user.id}
							token={token}
							setUser={setUser}/>} />
				<Route
					path="/products"
					element={
						<Products
							products={products}
							activeOrder={user.activeOrder}
							cartItems={cartItems}
							setCartItems={setCartItems}
						/>
					}
				/>
				<Route
					path="/Login"
					element={
						<Login
							setToken={setToken}
							setUser={setUser}
							setIsLoggedIn={setIsLoggedIn}
							setCartItems={setCartItems}
						/>
					}
				/>
				<Route
					path="/Cart"
					element={
						<Cart
							activeOrder={user.activeOrder}
							cartItems={cartItems}
							setCartItems={setCartItems}
						/>
					}
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
							setUser={setUser}
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
						/>
					}
				/>
				<Route
					path="/admin"
					element={
						<Admin
							currentUser={user}
							products={products}
							setProducts={setProducts}
						/>
					}
				/>
				<Route
					path="products/edit/:id"
					element={
						<EditProducts products={products} setProducts={setProducts} />
					}
				/>
			</Routes>

			<Footer />
		</div>
	);
};
{
	/* <Footer /> */
}

export default App;
