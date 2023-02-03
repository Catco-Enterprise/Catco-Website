import { useEffect } from "react";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';


function Cart({ cartItems, setCartItems }) {
	// const [order, setOrder] = useState(cartItems);

	function handleEmptyCart() {
		// Set useState 'cartItems' to an empty array
		setCartItems([]);

		// Delete the cache item 'cartItems'
		localStorage.removeItem("cartItems");
	}

	function totalPrice() {
		let total = 0;
		for (const product of cartItems) {
			total += product.price * product.quantity;
		}
		return total;
	}

	// function handleMinusQuantity(item) {
	// 	// Get the cart item from the useState variable 'cartItems' by the item ID
	// 	const itemIdx = order.findIndex((x) => x.id === itemId);

	// 	if (cartItem) {
	// 		// Subtract from the quantity of the cart item by 1
	// 		cartItem.quantity -= 1;

	// 		if (cartItem.quantity === 0) {
	// 			const indexOfItem = cartItems.findIndex((x) => x.id === itemId);
	// 			cartItems.splice(indexOfItem, 1);
	// 		}

	// 		// Update the useState variable 'cartItems' value
	// 		setCartItems(cartItems);

	// 		// Update the cache item 'cartItems' with the value from the useState 'cartItems'
	// 		localStorage.setItem("cartItems", JSON.stringify(cartItems));

	// 		// Reloading the page because the state isn't reflected on this action
	// 		location.reload(false);
	// 	}
	// }

	// function handlePlusQuantity(itemId) {
	// 	// Get the cart item from the useState variable 'cartItems' by the item ID
	// 	const cartItem = cartItems.find((x) => x.id === itemId);

	// 	if (cartItem) {
	// 		// Add from the quantity of the cart item by 1
	// 		cartItem.quantity++;

	// 		// Update the useState variable 'cartItems' value
	// 		setCartItems(cartItems);

	// 		// Update the cache item 'cartItems' with the value from the useState 'cartItems'
	// 		localStorage.setItem("cartItems", JSON.stringify(cartItems));

	// 		// Reloading the page because the state isn't reflected on this action
	// 		location.reload(false);
	// 	}
	// }

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
				</h1>
				{cartItems.map((item) => {
					return (
						<SingleProduct
							product={item}
							cartItems={cartItems}
							setCartItems={setCartItems}
						/>
					);
					// return (
					// 	<div key={item.id}>
					// 		<h2>{item.name}</h2>
					// 		<h2>{item.description}</h2>
					// 		<h2>{item.price}</h2>
					// 		<h2>{item.stock}</h2>
					// 		<h2>
					// 			Quantity:{" "}
					// 			<button onClick={() => handleMinusQuantity(item)}>-</button>
					// 			{item.quantity}
					// 			<button onClick={() => handlePlusQuantity(item)}>+</button>
					// 		</h2>
					// 		<Link to={`/products/${item.id}`} state={item}>
					// 			{" "}
					// 			<h4> Product Details </h4>{" "}
					// 		</Link>
					// 	</div>
					// );
				})}
			</div>
		);
	} else {
		return (
			<div>
				<h1>Cart</h1>
				<p>

					Cart is empty.</p>
			</div>
		);
	}
}

export default Cart;
