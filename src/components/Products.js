import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noImage from "../img/no-image.jpg";
import { getProducts } from "../axios-services";
import SingleProduct from "./SingleProduct";
import '../style/Products.css'


const Products = ({ currentUser, products, cartItems, setCartItems }) => {
	return (
		<div>
			<h1>Products</h1>
			<div className="products-container">
				{products.map((product) => {
					return (
						<SingleProduct
							key={product.id}
							product={product}
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
