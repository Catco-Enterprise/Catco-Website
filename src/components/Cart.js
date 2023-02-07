import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import Product from "./Product";

function Cart({ activeOrder, cartItems, setCartItems }) {
	function handleEmptyCart() {
		setCartItems([]);

		localStorage.removeItem("cartItems");
	}

	function totalPrice() {
		let total = 0;
		for (const product of cartItems) {
			total += product.price * product.quantity;
		}
		return total;
	}

	if (cartItems) {
		return (
			<div>
				<h1>
					Cart -{" "}
					<button onClick={() => handleEmptyCart()}>
						<FontAwesomeIcon icon={faTrashCan} />
						Empty My Cart
					</button>
					<span>Total: ${totalPrice()}</span>
					<Link to="/Checkout">
						Checkout
					</Link>
				</h1>
				{cartItems.map((item) => {
					return (
						<Product
							key={item.id}
							product={item}
							activeOrder={activeOrder}
							cartItems={cartItems}
							setCartItems={setCartItems}
						/>
					);
				})}
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
