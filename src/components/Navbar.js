import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();

    const linkStyle = {
        textDecoration: "none",
        margin: "7px"
    }

    function handleSignOut() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="navbar-container">
            <h1 className="navbar-title">Catco</h1>
            <nav className="navbar-items">
                <Link style={linkStyle} to="/">Home</Link>
                <Link style={linkStyle} to="/Products">Products</Link>
                <Link style={linkStyle} to="/Login">Login</Link>
                {state.token ? (
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