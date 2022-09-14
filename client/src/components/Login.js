import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants'
import Signup from './Signup';
import { LOGIN_MUTATION } from './Mutations';

function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: '',
    password: ''
  });

  // login - Uses input information to retrieve user token
  // Helper Function: login_process
  // -----------------------------------------------------
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    },
    onError(e) {
      alert(e);
      navigate('/Login');
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      localStorage.setItem("USER_USERNAME", formState.username);
    }
    
  });

  const login_process = () => {
    if (formState.username === '') {
      alert("Please input a username");
      return false;

    } else if (formState.password === '') {
      alert("Please input a password");
      return false;
    }
    return login();
  }


  return (
    <div className="">

    <Routes>
      <Route exact path='/Signup' element={<Signup />}></Route>
    </Routes>

      <div className="login-title">

          {/* Clicking the title of the website on this page sends you back to the Landing page */}
          <NavLink className="login-title-quiz" to='/'>
            Quiz
          </NavLink>
          <NavLink className="login-title-moment" to='/'>
            Moment
          </NavLink>
      </div>
      
      <form className="login-form" onSubmit={() => {
        
        login_process()
          .then((e) => {
            window.location.reload();
          })
        navigate('/MyProfile');

        }}>
        <div className="login-form-title">
          Login
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
          maxLength="24"
          minLength="6"
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
          className="login-input" 
          type="password"
          maxLength="32"
          minLength="8"
        /><br />
        
        <button 
          className="login-button" 
          type="submit"
        >
          Login
        </button>
        <nav>
          <NavLink className="signup-reroute" to='/Signup'>Don't have an account yet?</NavLink>
        </nav>
      </form>
    </div>
  );
}
export default Login;