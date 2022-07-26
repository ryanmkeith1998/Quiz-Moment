import { NavLink, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';

function Signup() {
    return (
      <div className="">

      <Routes>
        <Route exact path='/Login' element={<Login />}></Route>
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
            Signup
          </div>
          <label className="login-text" htmlFor="uname">Username:</label><br />
          <input className="login-input" type="text" id="uname" name="uname"/><br />
          <label className="login-text" htmlFor="email">Email:</label><br />
          <input className="login-input" type="email" id="email" name="email"/><br />
          <label className="login-text" htmlFor="pword">Password:</label><br />
          <input className="login-input" type="password" id="pword" name="pword"/><br />
          <label className="login-text" htmlFor="cpword">Confirm Password:</label><br />
          <input className="login-input" type="password" id="cpword" name="cpword"/><br />
          <button className="login-button" type="submit">Create Account</button>
          <nav>
            <NavLink className="signup-reroute" to='/Login'>Already have an account?</NavLink>
          </nav>
        </form>


      </div>
    );
  }
  
  export default Signup;