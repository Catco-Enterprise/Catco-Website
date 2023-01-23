import React from "react";
import { useForState } from "../StateContext";

const Products = () => {
   
   const { products } = useForState();

   
     return (
        <div>
         <h1>Products</h1>
         { products.map((product) => {
            return (
               <div key={product.id}>
                  <h2>{product.name}</h2>
                  <h2>{product.description}</h2>
                  <h2>{product.price}</h2>
                  <h2>{products.stock}</h2>

               </div>
            )

         })}

        </div>
     )
}





export default Products;