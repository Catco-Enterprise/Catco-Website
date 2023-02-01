const client = require("../client");

async function getOrderProductsByOrderId(id) {
    try {
        const { rows: [order_product] } = await client.query(`
      SELECT *
      FROM order_products
      WHERE "orderId" =  ${id}
      `);

        return order_product;
    } catch (error) {
        throw error;
    }
}

async function addProductToOrder({orderID, productId, quantity, price}) {
    try {
        const { rows: [product] } = await client.query(`
        INSERT INTO order_products("orderId", "productId", quantitiy, price)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT ("orderId", "productId") DO NOTHING
        RETURNING *;
        `, [orderID, productId, quantity, price])
        
        return product;
   
    } catch (error) {
        
        console.error("Error adding product to order", error);
        
    }
}

module.exports = {
    getOrderProductsByOrderId
}
