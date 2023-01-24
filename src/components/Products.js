import React from "react";
import useCatcoContext from "../CatcoContext";

function Products() {
   const { products } = useCatcoContext();

   return (
      products.map((item) => {
         <div key={item.name}>
            <h1>This product is {item.name}</h1>
            <p>... and the price is {item.price}</p>
         </div>
      })
   );
}





export default Products;