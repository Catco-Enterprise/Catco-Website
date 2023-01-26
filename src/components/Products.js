import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../axios-services";

const Products = ({ currentUser, products, cartItems, setCartItems }) => {
   // const [products, setProducts] = useState([])

   // useEffect(() => {
   //    const getAllProducts = async () => {
   //       const allProducts = await getProducts();
   //       // console.log("these are my products....", allProducts)
   //       setProducts(allProducts);
   //    }
   //    getAllProducts();
   // }, []);

   function handleAddToCart(productId) {
      const product = products.find(x => x.id === productId);

      if (product) {
         const cartItem = cartItems.find(x => x.id == productId);

         if (cartItem) {
            cartItem.quantity++;
         }
         else {
            product.quantity = 1;
            setCartItems(cartItems => [...cartItems, product]);
         }

         localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
   }

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
                  <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
               </div>
            )
         })}
      </div>

   )

}





export default Products;