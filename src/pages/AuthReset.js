import React from 'react';
import {useState} from 'react';

const AuthReset = () => {
    const [inputs, setInputs] = useState({username:""});
    const [buttons, setButtons] = useState({resetEnabled: false});
    const handleChange = async(event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
        setButtons({...buttons, resetEnabled:(value !== "")});
    }

    const handleReset = async(event) => {
        event.preventDefault();
        const response = await fetch(
            'http://localhost:12345/auth/reset',
            {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                },
                body:JSON.stringify({
                    "email":inputs.email,
                })
            });
        if (response.status !== 200) {
            document.getElementById("error").innerHTML = "Failed to reset. Please try again later ..."
        } else {
            const data = await response.json();
            if (data.error) {
                document.getElementById("error").innerHTML = data.error + ". Please try again later..."
            } else {
                document.getElementById("done").innerHTML = "Password reset link sent to "+inputs.email+"."
            }
        }
    }

    return (
        <>
            <div className="container">
                <h1>Password Reset</h1>
                <p>To reset your password, enter your email address.</p>
                <p id="error" className="error"></p>
                <form onSubmit={handleReset}>
                    <div className="row">
                        <div className="col-25">
                            <label>Email:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                name="email" 
                                value={inputs.email || ""} 
                                placeholder="email"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <input id="reset_button" type="submit" value="Send reset link" disabled={!buttons.resetEnabled}/>
                    </div>
                </form>
                <p><a href="/login">Login</a></p>
                <p><a href="/register">Register</a></p>
            </div>
        </>
    );
}

export default AuthReset;