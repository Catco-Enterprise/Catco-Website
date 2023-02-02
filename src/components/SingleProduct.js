import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";

const SingleProduct = ({ product, cartItems, setCartItems }) => {
	let prodQuantity = 0;
	const cartProdIdx = cartItems.findIndex((prod) => prod.id === product.id);

	if (cartProdIdx > -1) {
		prodQuantity = cartItems[cartProdIdx].quantity;
	}
	const singleProd = { ...product, quantity: prodQuantity };

	const [singProd, setSingProd] = useState(singleProd);

	function handleMinusQuantity() {
		const newQty = singProd.quantity - 1;
		setSingProd({ ...singProd, quantity: newQty });
	}
	function handlePlusQuantity() {
		const newQty = singProd.quantity + 1;
		setSingProd({ ...singProd, quantity: newQty });
	}

	function handleAddToCart() {
		setCartItems([...cartItems, singProd]);
	}

	function handleUpdateCartItem() {
		const updatedCart = [...cartItems];
		if (singProd.quantity) {
			updatedCart.splice(cartProdIdx, 1, singProd);
			setCartItems(updatedCart);
		} else {
			updatedCart.splice(cartProdIdx, 1);
			setCartItems(updatedCart);
		}
	}

	return (
		<div key={product.id} className="product">
			<img src="" alt="Product Img" />
			<Link to={`/products/${product.id}`} state={product} className="title">
				{product.name}
			</Link>
			<div className="price">${product.price}</div>
			<div>{product.description}</div>
			<br />

			<h2>
				Quantity: <button onClick={() => handleMinusQuantity()}>-</button>
				{singProd.quantity}
				<button onClick={() => handlePlusQuantity()}>+</button>
			</h2>
			{cartProdIdx > -1 ? (
				<button onClick={() => handleUpdateCartItem()}>Update Cart</button>
			) : (
				<button onClick={() => handleAddToCart()}>Add to Cart</button>
			)}
		</div>
	);
};

export default SingleProduct;
