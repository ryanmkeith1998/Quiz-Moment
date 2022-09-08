import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import GearIcon from '../icons/gear.png';
import React, { useState } from 'react';
import TakeQuiz from './Taker/TakeQuiz';
import { GET_USER, GET_ALL_QUIZZES } from './Queries';


function Feed() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);


  // GET_ALL_QUIZZES - retrieves all quizzes NOT associated with the logged in account
  // ---------------------------------------------------------------------------------
  useQuery(GET_ALL_QUIZZES, {
    onCompleted: (e) => {
      e.getAllQuizzes.map((quiz) => {
        let newQuiz = <ShowQuiz quiz={quiz} key={quiz.id}/>;
        setQuizzes(oldQuizzes => [...oldQuizzes, newQuiz]);
      })
    },
  });


  // goToProfile and logoutClick - Helper Functions
  // ----------------------------------------------
  const goToProfile = () => {
    navigate('../MyProfile');
  }

  const logoutClick = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem("USER_USERNAME");
    navigate('/');
  }

  
  return (
    <div className="full-page">

      <Routes>
        <Route exact path='/Quiz' element={<TakeQuiz/>}></Route>
      </Routes>

      {/* Title / Options Section */}
      <div className="login-title">
        <div className="login-title-quiz">Quiz</div>
        <div className="login-title-moment">Moment</div>
          
        <div className="profile-dropdown">
          <img src={GearIcon} className="profile-gear"/>
          <div className="profile-dropdown-content">
          <button onClick={goToProfile}>Profile</button>
              <button onClick={logoutClick}>Logout</button>
          </div>
        </div>
      </div>
      <hr className="profile-line"/>

      {/* Quiz Display Section */}
      <div className="feed-title">Here are the hottest quizzes:</div>
      <div className="feed-body">
        {quizzes}
      </div>
      </div>
  );
}

// ShowQuiz - Helper function to allow for listing the users quizzes
// -----------------------------------------------------------------
function ShowQuiz(props) {
    return (
      <div>
        <NavLink 
          to='/TakeQuiz' 
          state={{
            quiz: props.quiz
          }}
          className="feed-show-quiz"
        >
        <div className="feed-quiz-title">
            {props.quiz.title}
        </div>
        <div className="feed-quiz-user">
            Made by {props.quiz.ownedBy.username}
        </div>
        
        <div className="feed-quiz-description">
            {props.quiz.description}
        </div>
        </NavLink>
      </div>
    )
  }
export default Feed;