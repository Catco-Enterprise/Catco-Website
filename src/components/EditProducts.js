import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patchProduct, getProducts } from "../axios-services";

function EditProducts() {
    const params = useParams();
    const productId = params.id;

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [errorMessage, seterrorMessage] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setProducts(await getProducts(productId));
        }
        fetchData();
    }, []);

    async function handleSubmit(event, productId) {
        event.preventDefault();

        const name = event.target.name.value;
        const description = event.target.description.value;
        const stock = event.target.stock.value;
        const price = event.target.price.value;



        const updatedProduct = await patchProduct(productId, name, description, stock, price);

        console.log(updatedProduct);

        navigate('/admin')
    }


    const productsFormsHtml = products?.map((product) => {
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
    });

    return (
        <div>
            <h1>Edit Products</h1>
            {productsFormsHtml}
        </div>
    );
}

export default EditProducts;