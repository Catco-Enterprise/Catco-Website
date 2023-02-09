import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../axios-services";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';
import "../style/Register.css";


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
			<p><h1><center>Register</center></h1></p>
			<a><center>Join our family and enjoy our products today!</center></a>
			<form className="register" onSubmit={handleSubmit}>
				<p><center><label htmlFor="email">e-mail</label></center></p>
				<p><center><input type="email" placeholder="youremail@gmail.com" name="email" /></center></p>
		
				<p><center><label htmlFor="password">password</label></center></p>
				<p><center><input type="password" placeholder="*******" name="password" /></center></p>
				<p>
				<center>
				<button class ="register-button"> <FontAwesomeIcon icon={faRegistered} />
					_Register</button>
				</center>
				</p>
			</form>
			<p>{errorMessage}</p>
		</div>
	);
}

export default Register;
