import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../axios-services";

const SingleProduct = () => {
    const [oneProduct, setOneProduct] = useState([])

    useEffect(() => {
        const getOneProduct = async () => {
            const productView = await getSingleProduct();
            setOneProduct(productView);
        }
        getOneProduct();
    }, []);

    return (
        <div>
            {oneProduct.map(product => {
                return (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <h2>{product.description}</h2>
                        <h2>{product.price}</h2>
                        <h2>{product.stock}</h2>
                    </div>
                )
            })}
        </div>
    )


}

export default SingleProduct;