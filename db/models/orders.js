const client = require("../client");

async function getOrderById(userId) {
    try {
        const { rows: [order] } = await client.query(`
      SELECT *
      FROM orders
      WHERE "userId" =  ${userId}
      `);

        if (!order) {
            return null;
        }

        return order;
    } catch (error) {
        throw error;
    }
}

async function getActiveOrderById(userId) {
    try {
        const { rows: [order] } = await client.query(`
      SELECT *
      FROM orders
      WHERE "userId" =  ${userId} AND "isActive" = true
      `);

        if (!order) {
            return null;
        }

        return order;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOrderById
}