import React from 'react';
import {useState} from 'react';

const Login = () => {
    const [inputs, setInputs] = useState({username:"", password:""});
    const [buttons, setButtons] = useState({loginEnabled: false});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        setButtons({...buttons, loginEnabled: inputs.username !== "" && inputs.password !== ""});
    }

    const handleLogin = async(event) => {
        event.preventDefault();
        const response = await fetch(
            'http://localhost:12345/auth/login',
            {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                },
                body:JSON.stringify({
                    "username":inputs.username,
                    "password":inputs.password
                })
            });
        const data = await response.json();
        console.log("response: " + data);
    }

    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="row">
                        <div className="col-25">
                            <label>Username:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                name="username" 
                                value={inputs.username || ""}
                                placeholder="Email / Phone / National ID"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Password:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="password" 
                                name="password" 
                                value={inputs.password || ""} 
                                placeholder="password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <input id="login_button" type="submit" value="Login" disabled={!buttons.loginEnabled}/>
                    </div>
                </form>
                <p><a href="/register">Register</a></p>
                <p><a href="/reset">Forgot password</a></p>
            </div>
        </>
    );
}

export default Login;