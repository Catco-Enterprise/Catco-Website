import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apiHelpers/helperFunc";


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

        const result = await login(email, password);

        if (result.token) {
            localStorage.setItem('userToken', result.token)
            setIsLoggedIn(true);
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


//     return (
//         <div className="auth-form-container">
//             <h2>Login</h2>
//             <form className="login-form" onSubmit={handleSubmit}>
//                 <label htmlFor="email">e-mail</label>
//                 <input type="email" placeholder="youremail@gmail.com" id="email" name="email" />
//                 <label for="password">password</label>
//                 <input type="password" placeholder="*******" id="password" name="password" />
//                 {/* <button onClick={ }>Log In</button> */}
//                 <button>log in</button>

//             </form >
//             <p>{errorMessage}</p>
//         </div >
//     )
// }