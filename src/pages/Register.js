import React from 'react';
import {useState} from 'react';

//global variable
//var logged_in_username = ""

const national_id_pattern = /^[0-9]{13}$/;
const phone_pattern = /^0[0-9]{9}$/;
const email_pattern = /^[a-z]([a-z0-9.-]*[a-z0-9])*@([a-z][a-z0-9-]*\.)*[a-z]+$/;
const date_pattern = /^[0-9]{4}-[0-1][0-9]-[0-3][0-9]$/;

const Register = () => {
    const [inputs, setInputs] = useState({});
    const [buttons, setButtons] = useState({emailValid: false, loginEnabled: false, registerEnabled: false});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))

        if (name==="nationalId") {
            let nationalIdValid = national_id_pattern.test(value);
            if (!nationalIdValid) {
                document.getElementById("error").innerHTML = "National ID must be 13 digits with no spaces.";
            } else {
                document.getElementById("error").innerHTML = "";
            }
        }//if nat_id

        if (name==="firstName" || name==="lastName") {
            if (value==="") {
                document.getElementById("error").innerHTML = "Name and surname are required";
            } else {
                document.getElementById("error").innerHTML = "";
            }
        }//if first_name or last_name

        if (name==="dob") {
            if (!date_pattern.test(value)) {
                document.getElementById("error").innerHTML = "invalid date of birth";
            } else {
                document.getElementById("error").innerHTML = "";
            }
        }//if dob

        if (name==="email") {
            let emailValid = email_pattern.test(value);
            setButtons({...buttons, emailValid: emailValid, registerEnabled: emailValid});
            if (!emailValid) {
                document.getElementById("error").innerHTML = "invalid email";
            } else {
                document.getElementById("error").innerHTML = "";
            }
        }//if email

        if (name==="phone") {
            let phoneValid = phone_pattern.test(value);
            console.log("phone("+value+"): " + phoneValid)
            if (!phoneValid) {
                document.getElementById("error").innerHTML = "Phone number must be 10 digits, with no spaces, starting with a 0 for example 082111111, and it must be unique from other users' phone numbers.";
            } else {
                document.getElementById("error").innerHTML = "";
            }
        }//if phone
    }

    const handleRegister = async(event) => {
        event.preventDefault();
        console.log("Registering...")
        const response = await fetch(
            'http://localhost:12345/auth/register',
            {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                },
                body:JSON.stringify({
                    "national_id":inputs.nationalId,
                    "first_name":inputs.firstName,
                    "last_name":inputs.lastName,
                    "dob":inputs.dob,
                    "gender":inputs.gender,
                    "phone":inputs.phone,
                    "email":inputs.email
                })
            });
        const data = await response.json();
        console.log("response: " + data);
        //setMatches(data);
    }

    return (
        <>
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <div className="row">
                        <div className="col-25">
                            <label>National ID:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                name="nationalId" 
                                value={inputs.nationalId || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Name:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                name="firstName" 
                                value={inputs.firstName || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Surname:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                name="lastName" 
                                value={inputs.lastName || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Date of birth:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                name="dob"
                                maxLength="10"
                                placeholder="CCYY-MM-DD"
                                value={inputs.dob || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Gender:</label>
                        </div>
                        <div className="col-75">
                            <input type="radio" id="html" name="gender" value="M" onChange={handleChange}/>
                            <label htmlFor="html">Male</label>
                            <input type="radio" id="css" name="gender" value="F" onChange={handleChange}/>
                            <label htmlFor="css">Female</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Phone:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                name="phone" 
                                value={inputs.phone || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Email:</label>
                        </div>
                        <div className="col-75">
                            <input 
                                type="text" 
                                name="email" 
                                value={inputs.email || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <input id="register_button" type="submit" value="Register" disabled={!buttons.registerEnabled}/>
                    </div>
                </form>
                <p id="error" className="error"></p>
                <p><a href="/login">Login</a></p>
                <p><a href="/reset">Forgot password</a></p>
            </div>
        </>
    );
}

export default Register;