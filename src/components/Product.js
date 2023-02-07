import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
	addProductToActiveOrder,
	patchOrderProductQty,
	deleteOrderProduct,
} from "../axios-services";

const Product = ({ product, activeOrder, cartItems, setCartItems }) => {
	// let prodQuantity = 0;
	const cartProdIdx = cartItems.findIndex((prod) => prod.id === product.id);

	if (cartProdIdx > -1) {
		product.quantity = cartItems[cartProdIdx].quantity;
		// prodQuantity = cartItems[cartProdIdx].quantity;
	} else {
		product.quantity = 0;
	}
	// const singleProd = { ...product, quantity: prodQuantity };

	const [singProd, setSingProd] = useState(product);
	// const [singProd, setSingProd] = useState(singleProd);

	function handleMinusQuantity() {
		const newQty = singProd.quantity - 1;
		setSingProd({ ...singProd, quantity: newQty });
	}
	function handlePlusQuantity() {
		const newQty = singProd.quantity + 1;
		setSingProd({ ...singProd, quantity: newQty });
	}

	function handleAddToCart() {
		const newCartItems = [...cartItems, singProd];
		localStorage.setItem("cartItems", JSON.stringify(newCartItems));
		setCartItems(newCartItems);

		const token = localStorage.getItem("token");
		if (token) {
			addProductToActiveOrder(activeOrder.id, singProd, token);
		}
	}

	function handleUpdateCartItem() {
		const updatedCart = [...cartItems];
		const token = localStorage.getItem("token");
		if (singProd.quantity) {
			updatedCart.splice(cartProdIdx, 1, singProd);

			if (token) {
				patchOrderProductQty(
					token,
					activeOrder.id,
					singProd.id,
					singProd.quantity
				);
			}

			setCartItems(updatedCart);
		} else {
			updatedCart.splice(cartProdIdx, 1);

			if (token) {
				console.log(
					"SingleProduct: deleteOrderProduct arguments: ",
					token,
					activeOrder.id,
					singProd.id
				);
				deleteOrderProduct(token, activeOrder.id, singProd.id);
			}

			setCartItems(updatedCart);
		}
	}

	return (
		<div key={product.id} className="product">
			<div img="image">******{product.image}</div>
			<Link to={`/products/${product.id}`} state={product} className="title">
				{product.name}
			</Link>
			<div className="price">${product.price}</div>
			<div>{product.description}</div>
			<br />

			<h2>
				Quantity:{" "}
				<button onClick={() => handleMinusQuantity()}>
					<FontAwesomeIcon icon={faMinus} />
				</button>
				{singProd.quantity}
				<button onClick={() => handlePlusQuantity()}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</h2>
			{cartProdIdx > -1 ? (
				<button onClick={() => handleUpdateCartItem()}>Update Cart</button>
			) : (
				<button onClick={() => handleAddToCart()}>Add to Cart</button>
			)}
		</div>
	);
};

export default Product;
