import { NavLink, Routes, Route } from 'react-router-dom';
import Signup from '../components/Login';

function Login() {
    return (
      <div className="">

      <Routes>
        <Route exact path='/Signup' element={<Login />}></Route>
      </Routes>

        <div className="login-title">
            <div className="login-title-quiz">
                Quiz
            </div>
            <div className="login-title-moment">
                Moment
            </div>
        </div>
        
        <form className="login-form">
          <div className="login-form-title">
            Login
          </div>
          <label className="login-text" htmlFor="uname">Username:</label><br />
          <input className="login-input" type="text" id="uname" name="uname"/><br />
          <label className="login-text" htmlFor="pword">Password:</label><br />
          <input className="login-input" type="password" id="pword" name="pword"/><br />
          <button className="login-button" type="submit">Sign In</button>
          <nav>
            <NavLink className="login-reroute" to='/Signup'>Need an account?</NavLink>
          </nav>
        </form>


      </div>
    );
  }
  
  export default Login;