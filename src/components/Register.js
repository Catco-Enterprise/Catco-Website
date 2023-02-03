import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../axios-services";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';


function Register({ token, setToken, setUser, isLoggedIn, setIsLoggedIn }) {
	const navigate = useNavigate();

	const [errorMessage, setErrorMessage] = useState();

	async function handleSubmit(event) {
		event.preventDefault();

		const email = event.target.email.value;
		const password = event.target.password.value;

		if (!email || !password) {
			setErrorMessage("All fields are required.");
			return;
		}

		//change to token, rather than user w/ token attached
		const result = await register(email, password);

		if (result.token) {
			localStorage.setItem("token", result.token);
			setToken(result.token);
			setIsLoggedIn(true);
			setUser(result.newUser);
			navigate("/");
		}
	}

	// if (isLoggedIn) {
	// 	navigate("/");
	// }

	return (
		<div className="auth-form-container">
			<h2>Register</h2>
			<a> join our family and enjoy our products today</a>
			<form className="register-form" onSubmit={handleSubmit}>
				<label htmlFor="email">e-mail</label>
				<input type="email" placeholder="youremail@gmail.com" name="email" />
				<label htmlFor="password">password</label>
				<input type="password" placeholder="*******" name="password" />
				<button> <FontAwesomeIcon icon={faRegistered} />
					_Register</button>
			</form>
			<p>{errorMessage}</p>
		</div>
	);
}

export default Register;
