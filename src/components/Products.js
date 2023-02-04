import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noImage from "../img/no-image.jpg";
import { getProducts } from "../axios-services";
import SingleProduct from "./SingleProduct";

const Products = ({ activeOrder, products, cartItems, setCartItems }) => {
	// const [products, setProducts] = useState([])

	// function handleAddToCart(product, cartItems) {

	// 	const cartProdIdx = cartItems.findIndex((prod) => prod.id === product.id);

	// 	if (cartProdIdx > -1) {
	// 		// const cartItem = cartItems.find((x) => x.id == productId);

	// 		// if (cartItem) {
	// 		// 	cartItem.quantity++;
	// 		// } else {
	// 		// 	product.quantity = 1;
	// 		// 	setCartItems((cartItems) => [...cartItems, product]);
	// 		// }

	// 		// localStorage.setItem("cartItems", JSON.stringify(cartItems));

	// 		product.quantity += 1;
	// 		const newCart = cartItems.splice(cartProdIdx, 1, product);
	// 		setCartItems(newCart);
	// 	} else {
	// 		product.quantity
	// 	}
	// }

	// function deleteProduct(productId) {
	// 	// TODO: write functionality
	// }

	return (
		<div>
			<h1>Products</h1>
			<div className="products-container">
				{products.map((product) => {
					return (
						<SingleProduct
							key={product.id}
							product={product}
							activeOrder={activeOrder}
							cartItems={cartItems}
							setCartItems={setCartItems}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Products;
