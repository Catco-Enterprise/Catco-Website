import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { patchProduct } from "../axios-services";

function EditProduct({ products, setProducts }) {
    // Pass in the product as a parameter from <Link>
    const { state } = useLocation();
    const product = state;

    const navigate = useNavigate();

    // Create useState variables for each field
    // Initialize them with the values from the product we are editing
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [stock, setStock] = useState(product.stock);
    const [price, setPrice] = useState(product.price);

    const [errorMessage, setErrorMessage] = useState([]);

    async function handleSubmit(event, productId) {
        event.preventDefault();

        // Form is submitted, update the product to the new values
        const updatedProduct = await patchProduct(productId, name, description, stock, price);

        // If the method returns the product
        // (Not a very good fail safe)
        if (updatedProduct) {

            // Update the useState products so the screen has new data
            // You can also do this by just requerying the database
            products.forEach((product) => {
                if (product.id === updatedProduct.id) {
                    product.name = name;
                    product.description = description;
                    product.stock = stock;
                    product.price = price;
                }
            });

            setProducts(products);;
        }

        navigate('/admin')
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