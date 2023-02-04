import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { addToCart, minusQuantity, plusQuantity } from "../helpers/cartHelper";

const SingleProduct = ({ product, cartItems, setCartItems }) => {
	const cartItem = cartItems.find((x) => x.id === product.id);
	
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
				Quantity: <button onClick={() => minusQuantity(product.id, cartItems, setCartItems)}>
					<FontAwesomeIcon icon={faMinus} />
				</button>
				{ cartItem ? cartItem.quantity : 0 }
				<button onClick={() => plusQuantity(product.id, cartItems, setCartItems)}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</h2>
			{/* {cartProdIdx > -1 ? ( */}
			{/* <button onClick={() => handleUpdateCartItem()}>Update Cart</button> */}
			{/* ) : ( */}
			<button onClick={() => addToCart(product, cartItems, setCartItems)}>Add to Cart</button>
			{/* )} */}
		</div>
	);
};

export default SingleProduct;
