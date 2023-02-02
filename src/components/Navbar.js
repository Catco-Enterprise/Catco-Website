import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import logo from "../img/catco-logo.jpg";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faSignOut, faCartShopping, faRegistered } from '@fortawesome/free-solid-svg-icons';



function Navbar({ currentUser, isLoggedIn, resetState }) {
	const linkStyle = {
		textDecoration: "none",
		margin: "7px",
	};

	const adminHtml = currentUser?.isAdmin ? <a href="/admin">(admin)</a> : null;

	return (
		<div className="navbar-container">
			<h1 className="navbar-title"> <img src={logo} />{adminHtml}</h1>
			<nav className="navbar-items">

				<Link style={linkStyle} to="/">
					<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
					Home
				</Link>
				<Link style={linkStyle} to="/products">
					<FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
					Products
				</Link>
				{isLoggedIn ? (
					<Link
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
						<Link style={linkStyle} to="/Login">
							<FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
							Login
						</Link>
						<Link style={linkStyle} to="/Register">
							<FontAwesomeIcon icon={faRegistered}></FontAwesomeIcon>
							Register
						</Link>
					</span>
				)}
				<Link style={linkStyle} to="/Cart">
					<FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
					Cart
				</Link>
			</nav>
		</div >
	);
}

export default Navbar;
