import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
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

        // After we get the user's information, let's try and find out if they're logged in.
        // This can vary based on what we're expecting the API to return
        // See example below.

        // If the user authenticates from the API, set the context states 

        // const result = await login(email, password);

        // if (result.token) {
        //     localStorage.setItem('userToken', result.token)
        //     setIsLoggedIn(true);
        //     navigate('/');
        // }
        // else {
        //     setErrorMessage(result.error);
        // }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">e-mail</label>
                <input type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label for="password">password</label>
                <input type="password" placeholder="*******" id="password" name="password" />
                <button>Log In</button>
            </form>
            <p>{errorMessage}</p>
        </div>
    )
}

export default Login;