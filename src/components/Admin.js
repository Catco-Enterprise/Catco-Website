import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Admin({ currentUser, products }) {
    const navigate = useNavigate();

    useEffect(() => {
        function checkIfAdmin() {
            console.log(currentUser);
            // if (!currentUser?.isAdmin)
            //     navigate('/');
        }

        checkIfAdmin();
    });

    if (products.length > 0) {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Stock</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>{product.price}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
    else {
        return (<div>There are no products.</div>);
    }
}

export default Admin;