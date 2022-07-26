import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import { NavLink, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Main/>
    </div>
  );
}

const Main = () => (
  <>
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route exact path='/Login' element={<Login />}></Route>
      <Route exact path='/Signup' element={<Signup />}></Route>
    </Routes>
  </>
  
);

// const Navigation = () => (
//   <nav>
//     <ul>
//       <li><NavLink className="button landing-subtitle landing-subtitle-alt" to='/Login'>Login</NavLink></li>
//       <li><NavLink className="button landing-subtitle" to='/Signup'>Signup</NavLink></li>
//     </ul>
//   </nav>
// );

export default App;



