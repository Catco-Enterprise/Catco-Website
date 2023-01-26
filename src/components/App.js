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
import { getAPIHealth, getProducts } from '../axios-services';
import '../style/App.css';
import Register from './Register';
import { useStateDispatch } from '../StateContext';
import SingleProduct from './SingleProduct';

const App = () => {
  // const dispatch = useStateDispatch();

  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products products={products} />} />
        <Route path='/Login' element={<Login token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path="/products/:id" element={<SingleProduct products={products} />} />
        <Route path="/Register" element={<Register token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
};

export default App;
