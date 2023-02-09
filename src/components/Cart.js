import { useEffect } from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../style/Products.css";

function Cart({ activeOrder, cartItems, setCartItems, isLoggedIn }) {
	const match = useMatch("/Cart");
	function handleEmptyCart() {
		localStorage.removeItem("cartItems");
		setCartItems([]);
	}
	function totalPrice() {
		let total = 0;
		for (const product of cartItems) {
			total += product.price * product.quantity;
		}
		return total;
	}

	const navigate = useNavigate();

	if (cartItems) {
		return (
			<div>
				<h1>
					Cart -{" "}
					{match ? (
						<button onClick={() => handleEmptyCart()}>
							<FontAwesomeIcon icon={faTrashCan} />
							Empty My Cart
						</button>
					) : null}
					<span>Total: ${totalPrice()}</span>
				</h1>
				{cartItems.map((item) => {
					return (
						<SingleProduct
							key={item.id}
							product={item}
							activeOrder={activeOrder}
							cartItems={cartItems}
							setCartItems={setCartItems}
						/>
					);
				})}
				{match && isLoggedIn ? (
					<button onClick={() => navigate("/checkout")}>
						Proceed To Checkout
					</button>
				) : null}
			</div>
		);
	} else {
		return (
			<div>
				<h1>Cart</h1>
				<p>Cart is empty.</p>
			</div>
		);
	}
}

export default Cart;
