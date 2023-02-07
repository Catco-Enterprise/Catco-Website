import { useLocation } from "react-router";

function SingleProduct() {
	const { state } = useLocation();
    const product = state;

	return (
		<div key={product.id} className="product">
			<div img="image">******{product.image}</div>
			<span className="title">{product.name}</span>
			<div className="price">${product.price}</div>
			<div>{product.description}</div>
		</div>
	);
}

export default SingleProduct;