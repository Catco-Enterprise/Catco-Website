import React, { useState } from "react";
import { register } from "../axios-services";

function Register() {
    const [errorMessage, setErrorMessage] = useState();

    async function handleSubmit(event) {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !email || !password) {
            setErrorMessage('All fields are required.')
            return;
        }

        const registeredUser = await register(email, password);

        if (registeredUser.token) {
            window.localStorage.setItem('token', registeredUser.token);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input type="text" name="name" id="name" placeholder="full name" />
                <label htmlFor="email">e-mail</label>
                <input type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label for="password">password</label>
                <input type="password" placeholder="*******" id="password" name="password" />
                <button type="submit">Register</button>
            </form>
            <p>{errorMessage}</p>
        </div>
    );
}

export default Register;