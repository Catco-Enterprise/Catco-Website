import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noImage from "../img/no-image.jpg";
import { getProducts } from "../axios-services";

const Products = ({ currentUser, products, cartItems, setCartItems }) => {
	// const [products, setProducts] = useState([])

	// useEffect(() => {
	//    const getAllProducts = async () => {
	//       const allProducts = await getProducts();
	//       // console.log("these are my products....", allProducts)
	//       setProducts(allProducts);
	//    }
	//    getAllProducts();
	// }, []);

	function handleAddToCart(productId) {
		const product = products.find((x) => x.id === productId);

		if (product) {
			const cartItem = cartItems.find((x) => x.id == productId);

			if (cartItem) {
				cartItem.quantity++;
			} else {
				product.quantity = 1;
				setCartItems((cartItems) => [...cartItems, product]);
			}

			localStorage.setItem("cartItems", JSON.stringify(cartItems));
		}
	}

	function deleteProduct(productId) {
		// TODO: write functionality
	}

	return (
		<div>
			<h1>Products</h1>
			<div className="products-container">
				{products.map((product) => {
					return (
						<div key={product.id} className="product">
							<img src={noImage} />
							<Link
								to={`/products/${product.id}`}
								state={product}
								className="title"
							>
								{product.name}
							</Link>
							<div className="price">${product.price}</div>
							<div>{product.description}</div>
							<br />
							{/* <span>{product.stock}</span> */}
							<button onClick={() => handleAddToCart(product.id)}>
								Add to Cart
							</button>
							{currentUser?.isAdmin ? (
								<button onClick={() => deleteProduct(product.id)}>
									Delete
								</button>
							) : null}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Products;
