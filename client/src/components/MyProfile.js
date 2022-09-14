import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import GearIcon from '../icons/gear.png';
import React, { useEffect, useState } from 'react';
import QuizOverview from './Maker/QuizOverview';
import ViewQuiz from './Maker/ViewQuiz';
import { GET_USER, GET_QUIZZES, GET_ALL_TAKEN} from './Queries';
import { DELETE_USER, PUBLISH_QUIZ, ELIM_QUIZ } from './Mutations';
import { getEnterLeaveForKind } from 'graphql';



function Profile() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [takens, setTakens] = useState([]);
  const user = useQuery(GET_USER);

  // GET_QUIZZES - retrieves all quizzes associated with the logged in account
  // -------------------------------------------------------------------------
  const getQuizzes = useQuery(GET_QUIZZES, {
    onCompleted: (e) => {
      setQuizzes([]);
      e.getQuizzes.map((quiz) => {
        let newQuiz = <ShowQuiz quiz={quiz} title={quiz.title} id={quiz.id} published={quiz.published} key={quiz.id}/>;
        setQuizzes(oldQuizzes => [...oldQuizzes, newQuiz]);
      })
    },
  });

  const getTakens = useQuery(GET_ALL_TAKEN, {
    onCompleted: (e) => {
      setTakens([]);
      (e.getAllTaken).map((taken) => {
        let newTaken = <ShowTaken quizName={taken.quizName} name={taken.name} description={taken.description} key={taken.id}/>;
        setTakens(oldTakens => [...oldTakens, newTaken]);
      })
    }
  })

  useEffect(() => {
    getQuizzes.refetch();
    getTakens.refetch();
  }, [])
  

  // deleteAccount - Deletes the account that is currently signed in.
  // Helper functions: deleteClick
  // ----------------------------------------------------------------
  const [deleteAccount] = useMutation(DELETE_USER, {
    onCompleted: () => {
      logoutClick();
    }
  });

  const deleteClick = () => {
    if(window.confirm("Are you sure you wish to delete your account?")) {
      deleteAccount();
    }
  }

  // logoutClick - Removes User information from local storage and sends them to Landing Page
  // ----------------------------------------------------------------------------------------
  const logoutClick = () => {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem("USER_USERNAME");
    navigate('/');
  }

  


  // COME BACK TO THIS WHEN YOU ARE READY TO ADD MUSIC TO THE WEBSITE
  // import song from './game-notif.mp3';
  // let audio = new Audio(song);
  // let isPlaying = false;
  // const toggleSound = () => {
  //   if (!isPlaying) {
  //     audio.play();
  //     isPlaying = true;
  //   } else {
  //     audio.pause();
  //     isPlaying = false;
  //   }
  // }
  




  return (
    <div className="full-page">

      <Routes>
        <Route exact path='/Overview' element={<QuizOverview/>}></Route>
        <Route exact path='/ViewQuiz' element={<ViewQuiz />}></Route>
      </Routes>

      {/* Title / Options Section */}
      <div className="login-title">
        <div className="login-title-quiz">Quiz</div>
        <div className="login-title-moment">Moment</div>
          
        <div className="profile-dropdown">
          <img src={GearIcon} className="profile-gear"/>
          <div className="profile-dropdown-content">
            <button onClick={logoutClick}>Logout</button>
            <button onClick={() => {deleteClick()}}>Delete Account</button>
          </div>
        </div>
      </div>
      <hr className="profile-line"/>
      
      {/* Welcome Message Section */}
      <div className="profile-title-block">
        {user.data && <p>Welcome back { user.data.currentUser.name }! </p>}
        <div>
          
        </div>
      </div>
      <hr className="profile-line"/>
      
      {/* Quiz Maker / Taker Section */}
      <div className="profile-body-block">
          <div className="profile-body-maker">
            Your Quizzes: <br/>
            {quizzes}
            <hr className="profile-line profile-small-line"/>
            <button className="profile-quiz-button" onClick={() => {
              navigate('../Workshop')
              }}
            >
              Create Quiz
            </button>
          </div>

          <div className="profile-vert-line"/>

          <div className="profile-body-maker">
            Quizzes you've taken:<br/>
            {takens}
            <hr className="profile-line profile-small-line"/>
            <button className="profile-quiz-button" onClick={() => {
              navigate('../Feed')
              }}
            >
              See All Quizzes
            </button>
          </div>
      </div>
    </div>
  );
}

// ShowQuiz - Helper function to allow for listing the users quizzes
// -----------------------------------------------------------------
function ShowQuiz(props) {
  // publishQuiz - Publishes a quiz, making all details final and unchangeable
  // Helper Functions: postQuiz
  // -------------------------------------------------------------------------
  const [publishQuiz] = useMutation(PUBLISH_QUIZ, {
    variables: {
      qid: Number.parseInt(props.id)
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
    }
  })

  const postQuiz = () => {
    return publishQuiz();
  }


  // deleteQuiz - Deletes all data associated with the quiz from the database
  // Helper Functions: eliminateQuiz
  // ------------------------------------------------------------------------
  const [deleteQuiz] = useMutation(ELIM_QUIZ, {
    variables: {
      qid: Number.parseInt(props.id)
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      window.location.reload();
    }
  })

  const eliminateQuiz = () => {
    if(window.confirm("Are you sure you wish to delete this quiz?")) {
      return deleteQuiz();
    }
  }

  return (
    <div>

      {!props.published &&
      <div className="profile-quiz-organization">
        <NavLink 
          to='/Overview' 
          state={{
            title: props.title
          }}
          className="profile-show-quiz"
        >
        {props.title}
        </NavLink>
        <div className="profile-publish-wrapper">
          <button className='profile-publish-button' onClick={postQuiz}>&#10004;</button>
          <p className="profile-publish-blurb"
          >
            Clicking this button will publish the quiz, making it visible to everyone. (You will no longer be able to edit it)
          </p>
        </div>
      </div>
      }

      {props.published &&
      <div className='profile-quiz-organization'>
        <NavLink 
          to='/ViewQuiz' 
          state={{
            quiz: props.quiz
          }}
          className="profile-show-published-quiz"
        >
        {props.title}
        </NavLink>
        <div className='profile-publish-wrapper'>
          <button className='profile-delete-button' onClick={eliminateQuiz}>X</button>
          <p className="profile-publish-blurb profile-delete-blurb">Clicking this button will delete your quiz forever</p>
        </div>
      </div>
      }
    
    </div>
  )
}

function ShowTaken(props) {
  return (
    <div>
      <div className="profile-show-quiz">
        {props.quizName}
        <div className="profile-suppress-line">
          <hr className='profile-line'/>
        </div>
        {props.name}
      </div>
    </div>
  )
}

export default Profile;