import React from "react";
import {
	Link,
	// useNavigate 
} from "react-router-dom";
import "../style/Navbar.css";
import logo from "../img/catco-logo.jpg";
// import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faSignOut, faCartShopping, faRegistered } from '@fortawesome/free-solid-svg-icons';



function Navbar({ currentUser, isLoggedIn, resetState }) {

	const adminHtml = currentUser?.isAdmin ? <a href="/admin">(admin)</a> : null;

	return (
		<div className="navbar-container">
			<h1 className="navbar-title"> <img src={logo} />{adminHtml}</h1>
			<nav className="navbar-items">

				<Link className="link-style" to="/">
					<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
					Home
				</Link>
				<Link className="link-style" to="/products">
					<FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
					Products
				</Link>
				{isLoggedIn ? (
					<Link className="link-style"

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
						<Link className="link-style" to="/Login">
							<FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
							Login
						</Link>
						<Link className="link-style" to="/Register">
							<FontAwesomeIcon icon={faRegistered}></FontAwesomeIcon>
							Register
						</Link>
					</span>
				)}
				<Link className="link-style" to="/Cart">
					<FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
					Cart
				</Link>
			</nav>
		</div >
	);
}

export default Navbar;
