import React, { useState } from "react";

function Register() {
    const [errorMessage, setErrorMessage] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if(!name || !email || !password)
        {
            setErrorMessage('All fields are required.')
            return;
        }

        // Register the user via the API and set their token and any other context states
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
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;