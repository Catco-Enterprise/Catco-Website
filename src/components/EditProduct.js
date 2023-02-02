import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts, updateProduct } from "../../db/models/products";

function EditProduct() {
    const params = useParams();
    const productId = params.id;

    const navigate = useNavigate();

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [stock, setStock] = useState();
    const [price, setPrice] = useState();

    const [errorMessage, setErrorMessage] = useState([]);

    async function handleSubmit(event, productId) {
        event.preventDefault();

        const updatedProduct = await updateProduct(productId, name, description, stock, price);

        console.log(updatedProduct);

        navigate('/products')
    }

    return (
        <div key={product.id} className="info">
            <form onSubmit={(event) => handleSubmit(event, product.id)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" name="stock" onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" name="stock" onChange={(event) => setStock(event.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="text" name="price" onChange={(event) => setPrice(event.target.value)} />
                </div>
                <button>Submit</button>
            </form>
            <span>{errorMessage}</span>
        </div>
    )
}

export default EditProduct;