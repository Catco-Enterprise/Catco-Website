import React from "react";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import "../style/Checkout.css";
import Axios from "axios";
import { updateActiveOrder } from "../axios-services";

const Checkout = ({ user, cartItems, setCartItems, token, setUser }) => {
	const navigate = useNavigate();

	const placeOrder = async (event) => {
		event.preventDefault();
		const data = await updateActiveOrder(token, user.activeOrder.id, user.id);
		console.log("this the checkout user", data);
		setUser({ ...user, activeOrder: data });
		setCartItems([]);
		navigate("/confirmation");
	};

	return (
		<form className="checkout-form" onSubmit={placeOrder}>
			<h1>
				<u>Checkout</u>
			</h1>
			<div className="checkout-shipping">
				<h2>
					<u>Shipping Info</u>
				</h2>
				<label htmlFor="name">Name:</label>
				<input type="text" name="name" placeholder="Enter Full Name" />
				<label htmlFor="email">Email:</label>
				<input type="email" name="email" placeholder="Enter Valid Email" />
				<label htmlFor="address">Address:</label>
				<input type="text" name="address" placeholder="Current Address" />
				<label htmlFor="city">City:</label>
				<input type="text" name="city" placeholder="City" />
				<label htmlFor="state">State:</label>
				<input type="text" name="state" placeholder="State" />
				<label htmlFor="zip">Zip:</label>
				<input type="text" name="zip" placeholder="ZIP Code" />
			</div>
			<div className="checkout-payment">
				<h2>
					<u>Payment Info</u>
				</h2>
				<label htmlFor="Name">Name On Card:</label>
				<input type="text" name="Name" placeholder="Enter Full Name" />
				<label htmlFor="cardNumber">Card Number:</label>
				<input
					type="password"
					name="cardNumber"
					placeholder="xxxx xxxx xxxx xxxx"
				/>
				<label htmlFor="expiry">Expiration Date:</label>
				<input type="text" name="expiry" placeholder="MM/YYYY" />
				<label htmlFor="cvv">CVV:</label>
				<input type="text" name="cvv" placeholder="xxx" />
				<label htmlFor="zip">Zip:</label>
				<input type="text" name="zip" placeholder="ZIP Code" />
			</div>

			<div className="checkout-cart">
				<h1>
					<u>Review Your Cart</u>
				</h1>
				<Cart
					activeOrder={user.activeOrder}
					cartItems={cartItems}
					setCartItems={setCartItems}
				/>
			</div>
			<input type="submit" className="placeorder-button" value="Place Order" />
		</form>
	);
};

export default Checkout;
