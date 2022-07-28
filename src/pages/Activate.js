import React from 'react';
import {useState} from 'react';

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    //console.log(query)//"app=article&act=news_content&aid=160990"
    var vars = query.split("&");
    //console.log(vars) //[ 'app=article', 'act=news_content', 'aid=160990' ]
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return(false);
}

const Activate = () => {
    let tpw = getQueryVariable('tpw')
    const [inputs, setInputs] = useState({tpw: tpw, new_password:"", conf_password:""});
    const [buttons, setButtons] = useState({activateEnabled: false});
    const handleChange = async(event) => {
        const name = event.target.name;
        const value = event.target.value;
        let enabled = false
        if (name === "new_password") {
            //new_password: validity
            const response = await fetch('http://localhost:12345/validate/password',
            {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                },
                body:JSON.stringify({
                    "value":value,
                })
            });
            const data = await response.json();
            if (!data.valid) {
                document.getElementById("error").innerHTML = "New password is " + data.details;
            } else {
                //new password is valid
                if (value !== inputs.conf_password) {
                    document.getElementById("error").innerHTML = "New password is valid. Now repeat it ...";
                } else {
                    document.getElementById("error").innerHTML = "";//all good
                    enabled = true
                }
            }
            setInputs(values => ({...values, [name]: value, valid: data.valid}))//set new_password and valid
        } else {
            //conf_password changed: not testing validity, just need to be same as new_password
            if (!inputs.valid) {
                document.getElementById("error").innerHTML = "New password is still invalid";
            } else {
                //new password is valid
                if (value !== inputs.new_password) {
                    document.getElementById("error").innerHTML = "Keep typing ...";
                } else {
                    document.getElementById("error").innerHTML = "";//all good
                    enabled = true
                }
            }
            setInputs(values => ({...values, [name]: value}))//set conf_password
        }
        setButtons({...buttons, activateEnabled:enabled});
    }

    const handleActivate = async(event) => {
        event.preventDefault();
        const response = await fetch(
            'http://localhost:12345/auth/activate',
            {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                },
                body:JSON.stringify({
                    "tpw":inputs.tpw,
                    "new_password":inputs.new_password
                })
            });
        if (response.status !== 200) {
            document.getElementById("error").innerHTML = "Failed to activate. Please try again later ..."
        } else {
            const data = await response.json();
            console.log("response: " + data);
            if (data.error) {
                //activation failed:
                document.getElementById("error").innerHTML = data.error
            }
        }
    }

    return (
        <>
            <div className="container">
                <h1>Account Activation</h1>
                <p>Enter the password you would like to use and repeat the same password in the next box.</p>
                <p>Your new password must be 8 to 60 characters long and contain at least one digit (0-9), a letter (A-Z), a letter (a-z) and a symbol such as !@#$%.</p>
                <p id="error" className="error"></p>
                <form onSubmit={handleActivate}>
                    <div className="row">
                        <div className="col-25">
                            <label>New Password:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="password" 
                                name="new_password" 
                                value={inputs.new_password || ""} 
                                placeholder="Your new password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Confirm Password:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="password" 
                                name="conf_password" 
                                value={inputs.conf_password || ""} 
                                placeholder="Confirm your new password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <input id="activate_button" type="submit" value="Activate" disabled={!buttons.activateEnabled}/>
                    </div>
                </form>
                <p><a href="/login">Login</a></p>
                <p><a href="/register">Register</a></p>
                <p><a href="/reset">Forgot password</a></p>
            </div>
        </>
    );
}

export default Activate;