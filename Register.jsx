import React, { useState } from "react";

export const Register = (props) => {;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label>Full name</label>
            <input value={name} name="name" id="name" placeholder="full name" />
            <label htmlFor="email">e-mail</label>
            <input type = "email" placeholder = "youremail@gmail.com" id = "email" name = "email"/>
            <label for="password">password</label>
            <input type = "password" placeholder = "*******" id = "password" name = "password"/>
            <button>Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>  Already have an account? Log in here.</button>
        </div>

    )
}