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
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import Register from './Register';

const App = () => {
  // const dispatch = useStateDispatch();

  const [token, setToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [APIHealth, setAPIHealth] = useState('');
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // follow this pattern inside your useEffect calls:
  //   // first, create an async function that will wrap your axios service adapter
  //   // invoke the adapter, await the response, and set the data
  //   const getAPIStatus = async () => {
  //     const { healthy } = await getAPIHealth();
  //     setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
  //   };

<<<<<<< HEAD
  //   // second, after you've defined your getter above
  //   // invoke it immediately after its declaration, inside the useEffect callback
  //   getAPIStatus();
  // }, []);

  useEffect(async () => {
    async function fetchData() {
      // SET THEM PRODUCTS RIGHT HERE AND PASS EM AROUND!!
      // setProducts(await getProducts());
    }

    await fetchData();
=======
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();

    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
>>>>>>> a7750691ec96e1df165e23d7d9dc340b7ce5f8a3
  }, []);

  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/' element={<Home />} />
<<<<<<< HEAD
        <Route path='/Products' element={<Products products={products} />} />
        <Route path='/Login' element={<Login />} />
=======
        <Route path='/Products' element={<Products />} />
        <Route path='/Login' element={<Login token={token} setToken={setToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
>>>>>>> a7750691ec96e1df165e23d7d9dc340b7ce5f8a3
        <Route path='/Cart' element={<Cart />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
