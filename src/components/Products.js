import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../axios-services";

const Products = ({ products }) => {
   // const [products, setProducts] = useState([])

   // useEffect(() => {
   //    const getAllProducts = async () => {
   //       const allProducts = await getProducts();
   //       // console.log("these are my products....", allProducts)
   //       setProducts(allProducts);
   //    }
   //    getAllProducts();
   // }, []);

   return (
      <div>
         <h1>Products</h1>
         {products.map(product => {
            return (
               <div key={product.id}>
                  <h2>{product.name}</h2>
                  <h2>{product.description}</h2>
                  <h2>{product.price}</h2>
                  <h2>{product.stock}</h2>
                  <Link to={`/products/${product.id}`} state={product}> <h4> click me? click you! </h4> </Link>
               </div>
            )
         })}
      </div>

   )

}





export default Products;