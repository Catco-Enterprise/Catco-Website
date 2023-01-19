const { createUser } = require('./models/user');
const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function dropTables() {
  try {
    console.log("Dropping all tables!!!!!")

    await client.query(`
      DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!!!!!")
  } catch (error) {
    console.error("ERROR DROPPING TABLES!!!!!")
  }
}

async function createTables() {
  try {
    client.connect();
    console.log("Starting to create tables!!!!!")

    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    `);

    console.log("Finished creating tables!!!!!")

  } catch (error) {
    console.error("ERROR CREATING TABLES!!!!!")
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const usersToCreate = [
      { email: "albert@gmail.com", password: "bertie99" },
      { email: "sandra@gmail.com", password: "sandra123" },
      { email: "glamgal@gmail.com", password: "glamgal123" },
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
    await populateInitialData()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
