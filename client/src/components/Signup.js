import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import Login from './Login';
import { SIGNUP_MUTATION } from './Mutations';

function Signup() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    check_password: '',
    name: '',
    taken: false
  });

  
  // signup - Uses the input information to create a new account
  // Helper Functions: signup_process
  // -----------------------------------------------------------
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      username: formState.username,
      password: formState.password
    },
    onError() {
      alert("Username may already be taken...");
      navigate('/Signup');
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      localStorage.setItem("USER_USERNAME", formState.username);
    }
  });

  const signup_process = () => {
    if (formState.name === '') {
      alert("Please provide a Name");
      return false;

    } else if (formState.password === '') {
      alert("Please provide a valid password");
      return false;

    } else if (formState.check_password === '' || formState.check_password !== formState.password) {
      alert("Please re-enter your password");
      return false;

    } else if (formState.username === '') {
      alert("Please provide a valid username");
      return false;
    }
    return signup();
  }

  // passwordCheck - Helper function to help determine if password was input correctly
  // ---------------------------------------------------------------------------------
  const passwordCheck = () => {
    let elem = document.getElementById("password_check");
    if (formState.check_password !== formState.password) {
      elem.style.borderStyle = "solid";
      elem.style.borderColor = "red";
    } else {
      elem.style.borderStyle = "hidden";
    } 
  }

  // passwordValid - Helper function to help determine if password is of the correct length
  // --------------------------------------------------------------------------------------
  const passwordValid = () => {
    let elem = document.getElementById("password");
    if ((formState.password).length < 10) {
      elem.style.borderStyle = "solid";
      elem.style.borderColor = "red";
    } else {
      elem.style.borderStyle = "hidden";
    } 
  }
  

  return (
    <div className="">

    <Routes>
      <Route exact path='/Login' element={<Login />}></Route>
    </Routes>

      <div className="login-title">
          <NavLink className="login-title-quiz" to='/'>
            Quiz
          </NavLink>
          <NavLink className="login-title-moment" to='/'>
            Moment
          </NavLink>
      </div>
      
      {/* Signup Form Section */}
      <form className="login-form" onSubmit={() => {
        signup_process()
        .then((e) => {
          console.log(e);
          window.location.reload();
        })
      navigate('/MyProfile');
      }}>
        <div className="login-form-title">
          Signup
        </div>

        {/* Input for Username */}
        <label className="login-text">Username:</label><br />
        <input  
          value={formState.username} 
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value
            })
          }
          className="login-input" 
          type="text"
          id="username"
          maxLength="24"
          minLength="6" 
        /><br />

        {/* Input for Name */}
        <label className="login-text">Name:</label><br />
        <input  
          value={formState.name} 
          onChange={(e) =>
            setFormState({
              ...formState,
              name: e.target.value
            })
          }
          className="login-input" 
          type="text"   
        /><br />

        {/* Input for Password */}
        <label className="login-text">Password:</label><br />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          onBlur={passwordValid}
          className="login-input" 
          type="password"
          id="password"
          maxLength="32"
          minLength="10"
        /><br />

        {/* Input for Password Check */}
        <label className="login-text">Confirm Password:</label><br />
        <input
          value={formState.check_password}
          onChange={(e) =>
            setFormState({
              ...formState,
              check_password: e.target.value
            })
          }
          onBlur={passwordCheck}
          className="login-input" 
          type="password"
          id="password_check"
          maxLength="32"
          minLength="10"
        /><br />
        
        <button 
          className="login-button" 
          type="submit"
        >
          Create Account
        </button>
        <nav>
          <NavLink className="signup-reroute" to='/Login'>Already have an account?</NavLink>
        </nav>
      </form>
    </div>
  );
}
export default Signup;