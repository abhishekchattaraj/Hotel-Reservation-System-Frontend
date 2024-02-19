import React, { useState } from "react";
import {signUp} from '../services/user-service';
import {toast} from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

export const Register = (props) => {

    const navigate = useNavigate();
    const [data,setData] = useState({
      address:'',
      emailAddress:'',
      firstName:'',
      lastName:'',
      password:'',
      phoneNumber:''
    })

    const[error, setError] = useState({
      errors: {},
      isError:false,
    });

    //handleChange
    const handleChange=(event,property)=>{

      setData({...data, [property]:event.target.value})

    }

      const submitForm=(event)=> {

        event.preventDefault();

        if(error.isError){
          toast.error("Form data is Invalid!!!");
          return;
        }

        console.log(data);

        //data validate
        
        //call server api for sending data
        signUp(data).then((resp)=>{
          console.log(resp)
          console.log("success log")
          toast.success("User is registered successfully!!")
          setData({
            address:'',
            emailAddress:'',
            firstName:'',
            lastName:'',
            password:'',
            phoneNumber:''
          })
          navigate("/login")
        }).catch((error)=>{
          console.log(error)
          console.log("Error log")

          setError({
            errors:error,
            isError:true
          })
        })
      }

    
    return(
        <div className="auth-form-container">
            <h1 className="login-register-h1">Register</h1>
            <form className="register-form" onSubmit={submitForm}>

                <label className="register-page-label" htmlFor="firstName">First Name</label>
                <input className="register-page-input" 
                      onChange={(e) => handleChange(e,'firstName')}
                      value={data.firstName} 
                      name="firstName" 
                      id="firstName" 
                      placeholder="First Name" 
                      required/>

                <label className="register-page-label" htmlFor="lastName">Last Name</label>
                <input className="register-page-input"
                       onChange={(e) => handleChange(e,'lastName')} 
                       value={data.lastName}
                       name="lastName" 
                       id="lastName" 
                       placeholder="Last Name" 
                       required/>
                
                <label className="register-page-label" htmlFor="address">Address</label>
                <input className="register-page-input" 
                      onChange={(e) => handleChange(e,'address')}
                      value={data.address} 
                      name="address" 
                      id="address" 
                      placeholder="Address" 
                      required/>
                
                <label className="register-page-label" htmlFor="phoneNumber">Phone Number</label>
                <input className="register-page-input" 
                      onChange={(e) => handleChange(e,'phoneNumber')}
                      value={data.phoneNumber}
                      type="text"
                      pattern="[0-9]{10}" 
                      name="phoneNumber" 
                      id="phoneNumber" 
                      placeholder="Phone Number (10 digits)" 
                      required/>
                
                <label className="register-page-label" htmlFor="email">Email</label>
                <input className="register-page-input" 
                      onChange={(e) => handleChange(e,'emailAddress')}
                      value={data.emailAddress} 
                      type="email" 
                      placeholder="youremail@gmail.com" 
                      id="email" 
                      name="email" 
                      required/>
                
                <label className="register-page-label" htmlFor="password">Password</label>
                <input className="register-page-input" 
                      onChange={(e) => handleChange(e,'password')}
                      value={data.password}
                      type="password" 
                      placeholder="********" 
                      id="password" 
                      name="password" 
                      required/>
                
                {/*
                <label className="register-page-label" htmlFor="confirmPassword">Confirm Password</label>
                <input className={`register-page-input ${errors.confirmPwd ? 'is-invalid' : ''}`} 
                        {...register('confirmPwd')}  
                        type="password" 
                        placeholder="********" 
                        id="confirmPwd" 
                        name="confirmPwd" 
                        required/>*/}
                
                <button className="login-register-btn">Register</button>
            </form>
            <Link to={"/login"} className="logreg-btn">Already have an account? Login here.</Link>
            
        </div>
    )
}