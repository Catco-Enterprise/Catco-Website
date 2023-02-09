import React from "react";
import {
	Link,
	// useNavigate 
} from "react-router-dom";
import logo from "../img/catco-logo.jpg";
// import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faSignOut, faCartShopping, faRegistered } from '@fortawesome/free-solid-svg-icons';



function Navbar({ currentUser, isLoggedIn, resetState }) {
	const linkStyle = {
		// textDecoration: "none",
		// margin: "7px",
	};

	const adminHtml = currentUser?.isAdmin ? <a href="/admin">(admin)</a> : null;

	return (
		<div className="navbar-container">
			<h1 className="navbar-title"> <img className="logo" src={logo} />{adminHtml}</h1>
			<nav className="navbar-items">

				<Link className="link-style" style={linkStyle} to="/">
					<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
					Home
				</Link>
				<Link className="link-style" style={linkStyle} to="/products">
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
				<Link className="link-style" style={linkStyle} to="/Cart">
					<FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
					Cart
				</Link>
			</nav>
		</div >
	);
}

export default Navbar;
