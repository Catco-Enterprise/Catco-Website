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


async function createUser({ email, password }) {
  // const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userToAdd = { email, hashedPassword };
    const { rows: [user] } = await client.query(`
      INSERT INTO users (email, password)
      VALUES($1, $2)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `, [userToAdd.email, userToAdd.hashedPassword]);
    delete user.password;

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