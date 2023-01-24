import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'

function Navbar() {
    // Do the token be around here?
    const token = localStorage.getItem('token');

    const linkStyle = {
        textDecoration: "none",
        margin: "7px"
    }

    // Lord bless my soul, I banish thy token from thy browser
    // and establish this user as officially signed out
    // HALLELUJAH!
    function handleSignOut() {
        localStorage.removeItem('token');
    }

    return (
        <div className="navbar-container">
            <h1 className="navbar-title">Catco</h1>
            <nav className="navbar-items">
                <Link style={linkStyle} to="/">Home</Link>
                <Link style={linkStyle} to="/Products">Products</Link>
                <Link style={linkStyle} to="/Login">Login</Link>
                {/* If the token be around here, then we is gonna help you sign out */}
                {token ? (
                    <div>
                        <Link style={linkStyle} to='/' onClick={handleSignOut}>Sign Out</Link>
                    </div>
                ) : null}
                <Link style={linkStyle} to="/Cart">Cart</Link>

            </nav>
        </div>

    )
}


export default Navbar;