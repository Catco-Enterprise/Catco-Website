import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { patchProduct } from "../axios-services";

function EditProduct() {
    const { state } = useLocation();
    const product = state;

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [stock, setStock] = useState();
    const [price, setPrice] = useState();

    const [errorMessage, setErrorMessage] = useState([]);

    async function handleSubmit(event, productId) {
        event.preventDefault();

        const updatedProduct = await patchProduct(productId, name, description, stock, price);

        console.log(updatedProduct);

        navigate('/products')
    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event, product.id)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" defaultValue={product.name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" defaultValue={product.description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" name="stock" defaultValue={product.stock} onChange={(event) => setStock(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" defaultValue={product.price} onChange={(event) => setPrice(event.target.value)} />
                </div>
                <button>Submit</button>
            </form>
            <span>{errorMessage}</span>
        </div>
    )
}

export default EditProduct;