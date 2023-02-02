import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchProduct } from "../axios-services";
import { useLocation } from "react-router-dom";

function EditProducts() {

    const { state } = useLocation();
    const oneProduct = state;

    const navigate = useNavigate();
    // const [errorMessage, seterrorMessage] = useState();

    const [editName, setEditName] = useState(oneProduct.name);
    const [editDescript, setEditDescript] = useState(oneProduct.description);
    const [editStock, setEditStock] = useState(oneProduct.stock);
    const [editPrice, setEditPrice] = useState(oneProduct.price);


    async function handleSubmit(event, productId) {
        event.preventDefault();

        const name = event.target.value;
        const description = event.target.value;
        const stock = event.target.value;
        const price = event.target.value;

        await patchProduct(productId, name, description, stock, price);

        console.log(name, description, stock, price);

        navigate('/admin')
    }

    return (
        <div>
            <h1>Edit Products</h1>
            <div key={oneProduct.id} className="info">
                <form onSubmit={(event) => handleSubmit(event, product.id)}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input value={editName} type="text" name="name" onChange={(event) => setEditName(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input value={editDescript} type="text" name="description" onChange={(event) => setEditDescript(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="stock">Stock</label>
                        <input value={editStock} type="text" name="stock" onChange={(event) => setEditStock(event.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input value={editPrice} type="text" name="price" onChange={(event) => setEditPrice(event.target.value)} />
                    </div>
                    <button>Submit</button>
                </form>
                {/* <span>{errorMessage}</span> */}
            </div>
        </div>
    )
};

export default EditProducts;