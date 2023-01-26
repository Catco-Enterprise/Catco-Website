import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

export async function login(email, password) {
  const { data: user } = await axios.post('/api/users/login', {
    email: email,
    password: password
  });

  return user;
}

export async function register(email, password) {
  const { data: user } = await axios.post('/api/users/register', {
    email: email,
    password: password
  });

  return user;
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

export async function getProducts() {
  try {
    // console.log("frontend api")
    const { data: products } = await axios.get('/api/products');
    // console.log("this is my response..", response)
    console.log('---', products)

    return products;
  } catch (error) {
    console.error("Error fetching products...", error);
    throw error;

  }
}

export async function getSingleProduct(id) {
  try {
    // console.log('just adda message')
    const { data } = await axios.get(`/api/products/${id}`);
    console.log(data)
    // console.log(data.id)
    return data;

  } catch (error) {
    console.error('error in getting single product')
    throw error;
  }
}

