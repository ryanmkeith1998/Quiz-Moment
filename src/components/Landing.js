import { NavLink, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Signup from '../components/Signup';

function Home() {
  return (
    <div>
      <div className="landing-title">
        <div className="landing-title-quiz">
          Quiz
        </div>
        <div className="landing-title-moment">
          Moment
        </div>
      </div>

      <Routes>
        <Route exact path='/Login' element={<Login />}></Route>
        <Route exact path='/Signup' element={<Signup />}></Route>
      </Routes>

      <nav>
      <ul>
        <li><NavLink className="button landing-subtitle landing-subtitle-alt" to='/Login'>Login</NavLink></li>
        <li><NavLink className="button landing-subtitle" to='/Signup'>Signup</NavLink></li>
      </ul>
      </nav>
    </div>
  );
}

export default Home;