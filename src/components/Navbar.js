import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import logo from "../img/catco-logo.jpg";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faSignOut, faCartShopping, faRegistered } from '@fortawesome/free-solid-svg-icons';



function Navbar({ currentUser, isLoggedIn, setIsLoggedIn }) {
	const linkStyle = {
		textDecoration: "none",
		margin: "7px",
	};

	const adminHtml = currentUser?.isAdmin ? <a href="/admin">(admin)</a> : null;

	return (
		<div className="navbar-container">
			<nav className="navbar-items">
			<h1 className="navbar-title"> <img src ={logo} class="logo"/>{adminHtml}</h1>

				<Link style={linkStyle} to="/">
					<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
					Home
				</Link>
				<Link className="link-style-home" style={linkStyle} to="/products">
					<FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
					Products
				</Link>
				{isLoggedIn ? (
					<Link className="link-style"
						style={linkStyle}
						to="/"
						onClick={() => {
							localStorage.clear();
							resetState();
						}}
					>
						<FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
						Sign Out
					</Link>
				) : (
					<span>
						<Link className="link-style" style={linkStyle} to="/Login">
							<FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
							Login
						</Link>
						<Link className="link-style" style={linkStyle} to="/Register">
							<FontAwesomeIcon icon={faRegistered}></FontAwesomeIcon>
							Register
						</Link>
					</span>
				)}
				
			</nav>
		</div >
	);
}

export default Navbar;