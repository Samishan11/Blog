import React, { useState } from 'react';
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    let navigator = useNavigate();
    // statehooks
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [retypepassword, setRetypepassword] = useState("")


    // form submit 
    const userRegister = async (e) => {
        e.preventDefault();

        // register api using axios 
        const register = await axios.post('/register', {
            username,
            email,
            password,
            retypepassword
        })
        if (register.data.message === "register sucessfully") {
            toast.success("register success", { position: toast.POSITION.TOP_RIGHT })
            navigator("/login")
        } else if (register.data.message === "username already exist") {
            toast.warning("username alrady exist", { position: toast.POSITION.TOP_RIGHT })
        } else {
            toast.error("password not match", { position: toast.POSITION.TOP_RIGHT })
        }

        // const data = await register.json();

        console.log(register);
    }
    return (
        <>
            <div className="signup-form">
                <form method="post" onSubmit={userRegister}>
                    <h2>Create Account</h2>
                    <p className="lead text-success">
                        It's free and hardly takes more than 30 seconds.
                    </p>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-user" />
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Username"
                                required="required"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-paper-plane" />
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email Address"
                                required="required"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-lock" />
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                required="required"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-lock" />
                                <i className="fa fa-check" />
                            </span>
                            <input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                required="required"
                                onChange={e => setRetypepassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className=" btn btn-primary ">
                            Sign Up
                        </button>
                    </div>
                    <div className="text-center">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
