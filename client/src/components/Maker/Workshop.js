import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../../constants';
import GearIcon from '../../icons/gear.png';
import QuizOverview from './QuizOverview';
import React, { useState } from 'react';
import { QUIZ_CREATION } from '../Mutations';

function Workshop() {
  const navigate = useNavigate();
  const [Quiz, setQuiz] = useState({
    title: '',
    description: '',
  })


  // createQuiz - Adds a new quiz to the database using the given information
  // Helper Functions: newQuiz
  // ------------------------------------------------------------------------
  const [createQuiz] = useMutation(QUIZ_CREATION, {
    variables: {
      title: Quiz.title,
      description: Quiz.description,
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      navigate('/Overview', {state: {title: e.createQuiz.title}});
    }
  })

  const newQuiz = () => {
    if (Quiz.title === '') {
      alert('Please input a title for the quiz');
      return false;
    } else if (Quiz.description === '') {
      alert('Please input a description for the quiz');
      return false;
    }
    return createQuiz();
  }


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

      <div className="workshop-body-block">

        {/* Quiz Creation Section */}
        <div>
          <input  
            value={Quiz.title} 
            onChange={(e) =>
              setQuiz({
                ...Quiz,
                title: e.target.value
              })
            }
            className="workshop-input-title" 
            type="text" 
            placeholder="Sample Quiz Title"
            maxLength="64"
          />
          <div>
            <textarea  
              value={Quiz.description} 
              onChange={(e) =>
                setQuiz({
                  ...Quiz,
                  description: e.target.value
                })
              }
              className="workshop-input-content" 
              type="text"
              placeholder='Sample Quiz Description...'
              maxLength="500"
            /><br/>
          </div>
          
          <button onClick={newQuiz} className="workshop-button-confirm">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Workshop;