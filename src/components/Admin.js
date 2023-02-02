import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getAllUsers, createProduct, deleteProduct, patchProduct } from "../axios-services";

function Admin({ currentUser, setProducts, products }) {
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState();


    async function handleAddProduct(event) {
        event.preventDefault();

        const name = event.target.name.value;
        const description = event.target.description.value;
        const stock = event.target.stock.value;
        const price = event.target.price.value;

        const newProduct = {
            name: name,
            description: description,
            stock: stock,
            price: price
        }

        if (currentUser.isAdmin === true) {
            await createProduct(name, description, stock, price);
            setProducts([...products, newProduct])
        }
        else {
            return;
        }
    }

    async function handleDeleteProduct(event, productId) {
        event.preventDefault();
        const deletedProduct = await deleteProduct(productId);
        setProducts([...products])
    }

    useEffect(() => {
        async function checkIfAdmin() {
            // If 'currentUser' is defined and 'currentUser' is not an admin,
            // redirect the user to the login view
            if (currentUser.isAdmin === false) navigate('/login');
            console.log(currentUser)
            // ----------------------NEEDS MORE WORK

        }

        checkIfAdmin();
    }, [currentUser]);

    useEffect(() => {
        async function initData() {
            const result = await getAllUsers();
            setAllUsers(result);
        }

        initData();
    }, []);

    return (
        <div>
            <h1>All Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Is An Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers?.map((user) => {
                        return (<tr key={user.id}>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "Yes" : "No"}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
            <h1>Products</h1>
            <form onSubmit={handleAddProduct}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => {
                            return (<tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>${product.price}</td>
                                <td><button type="button" onClick={(event) => handleDeleteProduct(event, product.id)}>Delete</button></td>
                                <td><button type="button"> <Link
                                    to={`/products/edit/${product.id}`}
                                    state={product}>
                                    Edit
                                </Link></button></td>
                            </tr>);
                        })}
                        <tr>
                            <td><input type="text" name="name" required /></td>
                            <td><input type="text" name="description" required /></td>
                            <td><input type="number" name="stock" required /></td>
                            <td><input type="number" name="price" required /></td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default Admin;