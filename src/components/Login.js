import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apiHelpers/helperFunc";


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
        }
        else {
            setErrorMessage(result.error);
        }
    }

    return (
        <section>
            <h1>Login</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="UserName">email</label>
                    <input className="form-control" type="text" name="UserName" required
                        onChange={(event) => setUserName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="Password">Password</label>
                    <input className="form-control" type="password" name="Password" required
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button className="btn btn-primary" type="submit">Log In</button>
            </form>
        </section>
    );
}

export default Login;