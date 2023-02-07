import React from "react";
import SingleProduct from "./SingleProduct";
import '../style/Products.css'


const Products = ({ activeOrder, products, cartItems, setCartItems }) => {

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
