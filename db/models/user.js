// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getUserByEmail(email) {
  /* this adapter should fetch a list of users from your db */

  try {
    const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE email = $1
    `, [email])
    return user;
  } catch (error) {
    console.error("ERROR GETTING USERS BY EMAIL!!!!!")
  }
}

async function getAllUsers() {
  try {
    const { rows: [users] } = await client.query(`
    SELECT *
    FROM users
    RETURNING *
    `,)

    return users;
  } catch (error) {
    console.error('error in gett all users ADMIN')
    throw error;
  }
}

async function getUser({ email, password }) {
  /* this adapter should fetch a list of users from your db */
  if (!email || !password) {
    return;
  }

  try {
    const user = await getUserByEmail(email)
    const hashedPassword = user.password;
    let matchedPassword = await bcrypt.compare(password, hashedPassword);

    if (matchedPassword) {
      delete hashedPassword;
      return user;
    }
    else {
      return;
    }

  } catch (error) {
    console.error("ERROR GETTING USER!!!!!")
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
  // add your database adapter fns here
  getUserByEmail,
  getUser,
  createUser,
  getAllUsers
};