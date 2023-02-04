import { useEffect } from "react";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { emptyCart } from "../helpers/cartHelper";

function Cart({ cartItems, setCartItems }) {
	// const [order, setOrder] = useState(cartItems);

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
					<button onClick={() => emptyCart(setCartItems)}>
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
