import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

function Navbar({ currentUser, isLoggedIn, resetState }) {
	const linkStyle = {
		textDecoration: "none",
		margin: "7px",
	};

	const adminHtml = currentUser?.isAdmin ? <a href="/admin">(admin)</a> : null;

	return (
		<div className="navbar-container">
			<h1 className="navbar-title">Catco {adminHtml}</h1>
			<nav className="navbar-items">
				<Link style={linkStyle} to="/">
					Home
				</Link>
				<Link style={linkStyle} to="/products">
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
						Sign Out
					</Link>
				) : (
					<span>
						<Link style={linkStyle} to="/Login">
							Login
						</Link>
						<Link style={linkStyle} to="/Register">
							Register
						</Link>
					</span>
				)}
				<Link style={linkStyle} to="/Cart">
					Cart
				</Link>
			</nav>
		</div>
	);
}

export default Navbar;
