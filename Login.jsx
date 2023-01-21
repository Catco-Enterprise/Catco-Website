import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function  handleSubmit(event) {
        event.preventDefault();
        console.log(email);

        if (!email || !password) {
            setErrorMessage('Both email and password are required.')
            return;
        }

        const result = await login(email, password);

        if (result.token){
            localStorage.setItem('userToken', result.token)
            setIsLoggedIn(true);
            navigate('/');
        }
        else{
            setErrorMessage(result.error);
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">e-mail</label>
            <input type = "email" placeholder = "youremail@gmail.com" id = "email" name = "email"/>
            <label for="password">password</label>
            <input type = "password" placeholder = "*******" id = "password" name = "password"/>
            <button>Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}> Don't have an account? Register here.</button>
        </div>

    )

}