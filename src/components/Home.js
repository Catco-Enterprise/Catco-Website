import React from "react";
import "../style/Home.css";
import { login } from "../axios-services";
import { useNavigate } from "react-router-dom";

const Home = ({ setToken, setUser, setIsLoggedIn, setCartItems }) => {
	const navigate = useNavigate();
	async function handleClick(event) {
		event.preventDefault();

		const result = await login("albert@gmail.com", "bertie99");

		if (result.token) {
			const userCart = result.user.activeOrder.products;
			if (userCart.length) {
				localStorage.setItem("cartItems", JSON.stringify(userCart));
			}
			localStorage.setItem("token", result.token);

			setIsLoggedIn(true);
			setToken(result.token);
			setUser(result.user);
			setCartItems(userCart);

			navigate("/");

		}
	}

	return (
		<>
			
			
			<div className="welcome-info">
			<h1 class="weclome">Welcome to Catco</h1>
			<p>
				Welcome to Catco the ultimate e-commerce site for all things cats. Our
				mission is to provide the best experience for our furry cat parents.
				Click away on our products page and you will find everything you need.
			</p>

			<p>
				Just here to demo the site? Use the button below to sign in with a demo
				account, which will allow you to explore the site from the perspective
				of a registered user without the hassle of creating your own account. We
				hope you enjoy!
			</p>
			<p>
			<img src= "https://media.istockphoto.com/id/1322123064/photo/portrait-of-an-adorable-white-cat-in-sunglasses-and-an-shirt-lies-on-a-fabric-hammock.jpg?s=612x612&w=0&k=20&c=-G6l2c4jNI0y4cenh-t3qxvIQzVCOqOYZNvrRA7ZU5o=" class="home-image"></img>
			</p>
			<p>
				<button onClick={handleClick}>Demo Sign-In</button>
			</p>
			</div>
		</>
	);
};

export default Home;
