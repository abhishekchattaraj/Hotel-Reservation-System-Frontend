import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doLogin } from "../auth";
import { loginUser } from "../services/user-service";
export const Login = (props) => {

    const navigate = useNavigate()

    const [loginDetail,setLoginDetail] = useState({
        emailAddress:'',
        password:''
    })

    const handleChange = (event, field)=>{

        setLoginDetail({...loginDetail, [field]:event.target.value})

        /*let actualValue=event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })*/
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(loginDetail);

        //validation
        if(loginDetail.emailAddress.trim()==="" || loginDetail.password.trim()===""){
            toast.error("Username or Password is required")
            return;
        }

        //submit the data to generate token
        loginUser(loginDetail).then((data)=>{
            console.log(data)
            toast.success("User Logged IN");

            //save the data to local storage
            doLogin(data,()=>{
                console.log("login detail is saved to local storage")
                //redirect to user dashboard page
                navigate("/user/dashboard")
                window.location.reload();
            })
        }).catch(error=>{
            console.log(error)
            toast.error("Something went wrong!!!")
        })
    }

    


    return(
        <div className="auth-form-container">
            <h1 className="login-register-h1">Login</h1>
            <form className="login-form" onSubmit={handleFormSubmit}>

                {/*email field*/}

                <label className="login-page-label" htmlFor="email">Email</label>
                <input className="login-page-input"
                       value={loginDetail.emailAddress} 
                       onChange={(e) => handleChange(e,'emailAddress')} 
                       type="email" 
                       placeholder="youremail@gmail.com" 
                       id="email" 
                       name="email" 
                       />

                {/*password field*/}

                <label className="login-page-label" htmlFor="password">Password</label>
                <input className="login-page-input" 
                       value={loginDetail.password} 
                       onChange={(e) => handleChange(e,'password')} 
                       type="password" 
                       placeholder="********" 
                       id="password" 
                       name="password" 
                       />

                <button className="login-register-btn">Log In</button>
            </form>
            <Link to={"/register"} className="logreg-btn">Don't have an account? Register here.</Link>
        </div>
    )
}