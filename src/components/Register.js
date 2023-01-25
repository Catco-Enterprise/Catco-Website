import React, { useState } from "react";
import { register } from "../axios-services";

function Register({ token, setToken, isLoggedIn, setIsLoggedIn }) {
    const [errorMessage, setErrorMessage] = useState();

    async function handleSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !password) {
            setErrorMessage('All fields are required.')
            return;
        }

        const registeredUser = await register(email, password);

        if (registeredUser.token) {
            localStorage.setItem('token', registeredUser.token);
            setToken(registeredUser.token);
            setIsLoggedIn(true);
        }
    }

    if (isLoggedIn) {
        navigate('/');
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="email">e-mail</label>
                <input type="email" placeholder="youremail@gmail.com" name="email" />
                <label for="password">password</label>
                <input type="password" placeholder="*******" id="password" name="password" />
                <button>Register</button>
                <div>{errorMessage}</div>
            </form>
        </div>
    );
}

export default Register;