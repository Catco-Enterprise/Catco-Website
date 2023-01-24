import React, { useEffect, useState } from "react";

import { getProducts } from "../axios-services";

const Products = () => {
   
  
   const [ products, setProducts ] = useState('')

   useEffect(() => {
      const getAllProducts = async () => {
         const allProducts = await getProducts();
         console.log("these are my products....", allProducts)
         setProducts(allProducts);
      }
      getAllProducts();
   }, []);

   return (
      <div>
         <h1>Products</h1>
         {/* {products.map(product => {
            return (
               <div key={product.id}>
                  <h2>{product.name}</h2>
                  <h2>{product.description}</h2>
                  <h2>{product.price}</h2>
                  <h2>{product.stock}</h2>
               </div>
            )
         })} */}
         

      </div>
      
   )

}





export default Products;