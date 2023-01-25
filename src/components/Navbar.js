import React from "react";
import { Link } from 'react-router-dom'
import { useForState, useStateDispatch } from "../StateContext";
import '../style/Navbar.css'



const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    const linkStyle = {
        textDecoration: "none",
        margin: "7px"
    }

    const dispatch = useStateDispatch();
    const state = useForState();


    return (
        <div className="navbar-container">
            <h1 className="navbar-title">Catco</h1>
            <nav className="navbar-items">
                <Link style={linkStyle} to="/">Home</Link>
                <Link style={linkStyle} to="/Products">Products</Link>
                <Link style={linkStyle} to="/Login">Login</Link>
                {isLoggedIn ? (
                    <div>
                        <Link style={linkStyle} to='/' onClick={() => {
                            localStorage.clear();
                            setIsLoggedIn(false);
                        }}>Sign Out</Link>
                    </div>
                ) : null}
                <Link style={linkStyle} to="/Cart">Cart</Link>

            </nav>
        </div>

    )
}


export default Navbar;