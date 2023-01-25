import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../axios-services";

function Login({ token, setToken, isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();

    async function handleSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email || !password) {
            setErrorMessage('Both email and password are required.')
            return;
        }

        const result = await login(email, password);

        if (result.token) {
            localStorage.setItem('userToken', result.token)

            setIsLoggedIn(true);
            setToken(result.token);

            navigate('/');
        } else {
            setErrorMessage('Invalid username or password');
        }
    }

    if (isLoggedIn) {
        navigate('/');
    }
    return (
        <div>
            <h1>Login</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <button type="submit">Log In</button>
            </form>
            <div>{errorMessage}</div>
        </div>
    );
}

export default Login;