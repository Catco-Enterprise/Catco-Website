import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function login(email, password) {
  try {
    const response = await axios.post('/login', {
      method: 'Post',
      headers: {
        'content-type': 'application/json'
      },
      body: json.stringify({ email: email, password: password })
    })

    return await response.json();

  } catch (error) {

  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

// youe