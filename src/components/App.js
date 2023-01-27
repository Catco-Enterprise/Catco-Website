import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import Cart from './Cart';
import Products from './Products';
import Login from './Login';
import { Routes, Route } from 'react-router-dom';
// import { getProducts } from '../axios-services';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth, getProducts, getUser } from '../axios-services';
import '../style/App.css';
import Register from './Register';
import { useStateDispatch } from '../StateContext';
import SingleProduct from './SingleProduct';

const App = () => {
  // const dispatch = useStateDispatch();

  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [APIHealth, setAPIHealth] = useState('');

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      // console.log("these are my products....", allProducts)
      setProducts(allProducts);
    }
    getAllProducts();
  }, []);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  useEffect(() => {
    // All of the data we need to drill to components
    // should be gathered in this function
    // TODO: Move products here
    async function initAppData() {
      // Get the token from local storage
      const token = localStorage.getItem('token');

      // If token is defined,
      if (token) {
        // Set our 'token' useState variable to the value of 'token'
        setToken(token);

        // Set our 'isLoggedIn' useState variable to true
        setIsLoggedIn(true);

        // Get the user currently logged in by value of 'token'
        const result = await getUser(token);

        // Set our 'currentUser' useState variable to the logged in user
        // We will use the 'isAdmin' property of current user to determine
        // if the user has admin priveleges
        setCurrentUser(result.user);
      }

      // Get the items in cart from the local storage
      const cachedCartItems = JSON.parse(localStorage.getItem('cartItems'));

      // If items are defined,
      if (cachedCartItems) {

        // Set our 'cartItems' useState variable to the cached items
        setCartItems(cachedCartItems);
      }
    }

    initAppData();
  }, []);

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products currentUser={currentUser} products={products} cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/Login' element={<Login token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/Cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/products/:id" element={<SingleProduct products={products} />} />
        <Route path="/Register" element={<Register token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;
