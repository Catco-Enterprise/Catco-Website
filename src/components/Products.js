function Products({ products }) {
   if (products) {
      return products.map((item) => {
         <div>
            populate info about them products here!!!
         </div>
      });
   }
}

export default Products;