// grab our db client connection to use with our adapters
const client = require('../client');

// Deliver me dem products from that DB
export async function getProducts() {
    try {
        const selectQuery = 'SELECT * FROM products';
        const { rows: [products] } = await client.query(selectQuery);

        return products;
    } catch (error) {
        console.error('There was an issue getting products from the database.', error);
        throw error;
    }
}