import React, {useState} from 'react'
import './login.css'
import {Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = () => {
    let navigator = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userLogin = async(e)=>{
        e.preventDefault();
        const login  = await axios.post("/login",{
            email,
            password
        })
        if(login.data.message === "login success"){
            toast.success(login.data.message, {position:toast.POSITION.TOP_RIGHT})
            localStorage.setItem("token",login.data.token)
            console.log(login.data.token);
            window.location.href = "/"
        }else{
            toast.error(login.data.message, {position:toast.POSITION.TOP_RIGHT})  
        }

    }

    return (
        <>
            <div className="signin-form">
                <form method="post" onSubmit={userLogin}>
                    <h2>Login</h2>
                    <div className="form-group mt-5">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-user" />
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="email"
                                required="required"
                                onChange={e=>setEmail(e.target.value)}
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
                                required="required"
                                onChange={e=>setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className=" btn btn-primary ">
                            Sign In
                        </button>
                    </div>
                    <div className="mb-3">
                        <p className="text-center">Or login with</p>
                        <div className="d-flex justify-content-center">
                            <div className="icons">
                                <i
                                    className="fab fa-google mx-1 text-success"
                                    style={{ fontSize: 28 }}
                                />
                                <i
                                    className="fab fa-facebook mx-1 text-primary"
                                    style={{ fontSize: 28 }}
                                />
                                <i
                                    className="fab fa-instagram  mx-1 text-danger"
                                    style={{ fontSize: 28 }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        Don't have an account? <Link to="/register">Register here</Link>.
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login;
