import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';
import Profile from './components/MyProfile';
import Workshop from './components/Maker/Workshop';
import QuizOverview from './components/Maker/QuizOverview';
import Feed from './components/Feed';
import TakeQuiz from './components/Taker/TakeQuiz';
import TestPapa from './testRange/testPapa';
import ShowResult from './components/Taker/ShowResult';
import ViewQuiz from './components/Maker/ViewQuiz';
import { Routes, Route } from 'react-router-dom';

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
      <Route exact path='/Login/*' element={<Login />}></Route>
      <Route exact path='/Signup/*' element={<Signup />}></Route>
      <Route exact path='/MyProfile/*' element={<Profile />}></Route>
      <Route exact path='/Workshop/*' element={<Workshop />}></Route>
      <Route exact path='/Overview/*' element={<QuizOverview />}></Route>
      <Route exact path='/Feed/*' element={<Feed />}></Route>
      <Route exact path='/TakeQuiz/*' element={<TakeQuiz />}></Route>
      <Route exact path='/TestPapa/*' element={<TestPapa />}></Route>
      <Route exact path='/ShowResult/*' element={<ShowResult />}></Route>
      <Route exact path="/ViewQuiz" element={<ViewQuiz />}></Route>
    </Routes>
  </>
  
);

export default App;



