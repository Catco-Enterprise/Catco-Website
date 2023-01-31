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



module.exports = {
    getOrderProductsByOrderId
}