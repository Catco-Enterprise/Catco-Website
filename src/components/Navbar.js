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

	return (
		<div className="navbar-container">
			<div id="logo">
				<img className="logo" src={logo} />
			</div>
			<nav className="navbar-items">
				<Link to="/">
					<FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
					Home
				</Link>
				<Link to="/products">
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
						<Link to="/Login">
							<FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
							Login
						</Link>
						<Link to="/Register">
							<FontAwesomeIcon icon={faRegistered}></FontAwesomeIcon>
							Register
						</Link>
					</span>
				)}
				<Link to="/Cart">
					<FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
					Cart
				</Link>
			</nav>
		</div>
	);
}

export default Navbar;
