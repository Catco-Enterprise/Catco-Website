import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../axios-services";

function Register({ token, setToken, isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

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
                <label htmlFor="password">password</label>
                <input type="password" placeholder="*******" name="password" />
                <button>Register</button>
            </form>
            <p>{errorMessage}</p>
        </div>
    );
}

export default Register;