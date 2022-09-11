import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useLocation} from "react-router-dom";
import { AUTH_TOKEN } from '../../constants';
import GearIcon from '../../icons/gear.png';
import React, { useEffect, useState } from 'react';
import ShowResult from './ShowResult';
import QuestionCards from './Questions/QuestionCards';
import { FIND_TAKEN } from '../Queries';


function TakeQuiz(props) {
    const navigate = useNavigate();
    const quiz = useLocation().state.quiz;
    const [items, setItems] = useState();
    const [ready, setReady] = useState(false);
    const [taken, setTaken] = useState(false);

    
    // FIND_TAKEN - searches the database to detect whether this user has already taken this quiz before
    // -------------------------------------------------------------------------------------------------
    const { refetch } = useQuery(FIND_TAKEN, {
        variables: {
            quizId: Number.parseInt(quiz.id)
        },
        onCompleted: (e) => {
            if (e.findTaken !== null) {
                setTaken(true);
            }
        },
    })


    // useEffect - Refetches the data every time page loads, just in case user takes quiz again without reloading the webpage
    // ----------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        refetch();
    }, []);


    // goToProfile and logoutClick - Helper functions
    // ----------------------------------------------
    const goToProfile = () => {
        navigate('../MyProfile');
    }

    const logoutClick = () => {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem("USER_USERNAME");
        navigate('/');
    }

    let list = [];

    function addAnswer(info) {
        list = [...list, info];
        if (list.length === (quiz.questions).length) {
            setItems(list);
            setReady(true);
        }
    }

    function changeAnswer(oldItem, newItem) {
        list = list.filter(item => item[0] !== oldItem);
        list = [...list, newItem];
        if (list.length === (quiz.questions).length) {
            setItems(list);
            setReady(true);
        }
    }

    const showList = () => {
        console.log(items);
    }


    return (
    <div className="full-page">

        <Routes>
            <Route exact path='/ShowResult' element={<ShowResult/>}></Route>
        </Routes>

        {/* Title and Options Section */}
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

        {/* Body Section */}
        <div>
            <div className="workshop-body-block">
                <div>
                    {/* Quiz Title Section */}
                    <p className="quiz-title-title">{quiz.title}</p>
                    <p className="quiz-title-description">{quiz.description}</p>
                </div>

                <hr className="profile-line"/>

                <div className="feed-question-section">
                    {/* Question Section */}
                    <QuestionCards questions={quiz.questions} changeAnswer={changeAnswer} addAnswer={addAnswer}/>
                </div>
            </div>
        </div>

        <hr className="profile-line"/>

        {ready && 
        <div >
            {/* <button onClick={() => {refetch()}}>click me</button> */}
        <NavLink 
            to='/ShowResult' 
            state={{
                theList: items,
                theQuiz: quiz,
                taken: taken,
            }}
            className="TQ-submit"
        >
            Submit Quiz
        </NavLink>
        </div>
        }
    </div>
    )
}
export default TakeQuiz;