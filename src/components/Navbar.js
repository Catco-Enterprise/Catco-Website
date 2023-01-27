import React from "react";
import { Link } from 'react-router-dom'
import '../style/Navbar.css'

function Navbar({ currentUser, isLoggedIn, setIsLoggedIn }) {
    const linkStyle = {
        textDecoration: "none",
        margin: "7px"
    }

    const adminHtml = currentUser?.isAdmin ? "(admin)" : null;

    return (
        <div className="navbar-container">
            <h1 className="navbar-title">Catco {adminHtml}</h1>
            <nav className="navbar-items">
                <Link style={linkStyle} to="/">Home</Link>
                <Link style={linkStyle} to="/products">Products</Link>
                {isLoggedIn ? (
                    <Link style={linkStyle} to='/' onClick={() => {
                        localStorage.clear();
                        setIsLoggedIn(false);
                    }}>Sign Out</Link>
                ) :
                    <span>
                        <Link style={linkStyle} to="/Login">Login</Link>
                        <Link style={linkStyle} to="/Register">Register</Link>
                    </span>

                }
                <Link style={linkStyle} to="/Cart">Cart</Link>

            </nav>
        </div>
    );
}


export default Navbar;