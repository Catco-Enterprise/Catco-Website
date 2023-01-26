const client = require("../client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getAllUsers() {
  try {
    const query = 'SELECT * FROM users';
    const { rows: [users] } = await client.query(query)

    return users;
  } catch (error) {
    console.error('Error getting all users')
    throw error;
  }
}

async function getUser({ email, password }) {
  if (!email || !password) {
    return;
  }

  try {
    const user = await getUserByEmail(email)
    const hashedPassword = user.password;
    let matchedPassword = await bcrypt.compare(password, hashedPassword);

    if (matchedPassword) {
      delete user.password;
      return user;
    }
    else {
      return;
    }

  } catch (error) {
    console.error("Error getting user")
  }
}

async function getUserByEmail(email) {
  try {
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    const { rows: [user] } = await client.query(query);

    return user;
  } catch (error) {
    console.error("Error getting users by email address");
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE id =  ${userId}
    `);

    if (!user) {
      return null;
    }

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}


async function createUser({ email, password, isAdmin }) {
  try {
    // Encrypt the plain-text password passed by the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Instiantiate an empty variable to hold our query
    let query;

    // Checking to see if isAdmin is defined instead of assuming that every time
    // isAdmin is defined allows us to still create admins without adjusting
    // the rest of our user-related functions
    // If 'isAdmin' is defined,
    if (isAdmin) {
      // Populate 'query' with a query including the 'isAdmin' property
      query = `INSERT INTO users (email, password, "isAdmin")
      VALUES('${email}', '${hashedPassword}', '${isAdmin}')
      ON CONFLICT (email) DO NOTHING
      RETURNING *`;
    }
    else {
      // 'isAdmin' is not defined
      // Populate 'query' with a query excluding the 'isAdmin' property
      query = `INSERT INTO users (email, password)
      VALUES('${email}', '${hashedPassword}')
      ON CONFLICT (email) DO NOTHING
      RETURNING *`
    }

    // Run the query against our DB
    const { rows: [user] } = await client.query(query);

    // Remove the password before returning the user
    delete user.password;

    // Return the user
    return user;
  } catch (error) {
    console.error("ERROR CREATING USER!!!!!")
  }
}
module.exports = {
  getAllUsers,
  getUser,
  getUserByEmail,
  getUser,
  createUser,
  getAllUsers,
  getUserById
};