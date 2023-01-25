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

async function createUser({ email, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser = { email, hashedPassword };

    const query = `INSERT INTO users (email, password)
                   VALUES('${newUser.email}', '${newUser.hashedPassword})
                   ON CONFLICT (email) DO NOTHING
                   RETURNING *`;

    const { rows: [user] } = await client.query(query);

    delete user.password;

    return user;
  } catch (error) {
    console.error("Error creating user")
  }
}

module.exports = {
  getAllUsers,
  getUser,
  getUserByEmail,
  createUser
};