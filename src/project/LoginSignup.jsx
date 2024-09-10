import React, { useState } from 'react';
import  './LoginSignup.css';
import { BASE_URL } from '../config/const';
import {useNavigate} from "react-router-dom"


function Loginsignup()  {

  const [state,setState]=useState("Login");
  let navigate=useNavigate();


  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all the fields.");
      return false;
    }
    if (state === "Sign Up" && !formData.username) {
      alert("Please enter your name.");
      return false;
    }
    if (state === "Sign Up" && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(formData.password)) {
      alert("Password should have at least one digit, one lowercase letter, one uppercase letter, and be a minimum of 8 characters long, without special characters.");
      return false;
    }
    return true;
  };


console.log("base url " , BASE_URL)
  const login=async()=>{
    if (!validateForm()) return;
      console.log("Login Function Executed",formData);
      let responseData;
      await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response) => response.json()).then((data) =>responseData = data)
          if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            navigate("/home");
          }
          else{
            alert(responseData.error)
          }
  }

  const signup = async () => {
    if (!validateForm()) return;
    console.log("SignUp Function Executed", formData);
    let responseData;
    await fetch(`${BASE_URL}/signup`, {
      method: 'POST', 
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) =>responseData = data)
        if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token);
          navigate("/home");
        }
        else{
          alert(responseData.error)
        }
  };
  
  return (
    <div className="login-bg">
    <div className="loginsignup">
      <div className={state === "Sign Up" ? "loginsignup-container signup1-container" : "loginsignup-container login1-container"}>
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ?
            <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p> :
            <p className="loginsignup-login">Create an account <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
            <div className='Terms'>
            <p style={{ fontSize: '12px' }}>
              By {state} you are agreeing to our Terms and Conditions
            </p>
          </div>
        </div>
        
    </div>
  </div>
);
};

export default Loginsignup;
