import React, { useState } from "react";
import { registerUser } from "../axios-services";

function Register({ setToken }) {
	const [errorMessage, setErrorMessage] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (event) => {
		event.preventDefault();

		// const name = event.target.name.value;
		// const email = event.target.email.value;
		// const password = event.target.password.value;

		if (!email || !password) {
			setErrorMessage("All fields are required.");
			return;
		}
		try {
			const data = await registerUser(email, password);
			if (data.error) {
				throw data;
			}
			setToken(data.token);
		} catch (error) {}

		// Register the user via the API and set their token and any other context states
	};

	return (
		<div className="auth-form-container">
			<h2>Register</h2>
			<form className="register-form" onSubmit={handleSubmit}>
				<label htmlFor="email">e-mail</label>
				<input
					type="email"
					placeholder="youremail@gmail.com"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label for="password">password</label>
				<input
					type="password"
					placeholder="*******"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<input type="submit" value="Sign Up!" />
			</form>
		</div>
	);
}

export default Register;
