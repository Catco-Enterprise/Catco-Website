// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt");

async function getUsersByEmail(email) {
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

async function getUsers({ email, password }) {
  /* this adapter should fetch a list of users from your db */
  if (!email || !password) {
    return;
  }

  try {
    const user = await getUsersByEmail(email)
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
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users (email,password)
      VALUES($1,$2)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `, [email, hashedPassword]);
    delete user.password;

    return user;
  } catch (error) {
    console.error("ERROR CREATING USER!!!!!")
  }
}

module.exports = {
  // add your database adapter fns here
  getUsersByEmail,
  getUsers,
  createUser,
};