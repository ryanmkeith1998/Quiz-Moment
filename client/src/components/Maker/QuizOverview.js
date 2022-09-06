import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useLocation} from "react-router-dom";
import { AUTH_TOKEN } from '../../constants';
import GearIcon from '../../icons/gear.png';
import QuizTitle from './Title-Section';
import QuizResult from './Results/Result-Section';
import QuizQuestion from './Questions/Question-Section';
import React, { useState, useEffect } from 'react';
import { ELIM_QUIZ, PUBLISH_QUIZ } from '../Mutations';
import { GET_QUIZ } from '../Queries';

function QuizOverview() {
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState({id: 0});
    const [ready, setReady] = useState(false);
    let title = useLocation().state.title;


    // GET_QUIZ - Retrieves the given quiz and all associated data from the database
    // -----------------------------------------------------------------------------
    const { refetch } = useQuery(GET_QUIZ, {
        variables: {
            title: title
        },
        onError(e) {
            alert(e);
        },
        onCompleted: (e) => {
            console.log("refetch complete");
            setQuiz(e.findQuiz);
            setReady(true);
        },
    });

    function makeRefetch() {
        console.log("okay im refetching...");
        refetch();
    }

    // deleteQuiz - Deletes all data associated with the quiz from the database
    // Helper Functions: eliminateQuiz
    // ------------------------------------------------------------------------
    const [deleteQuiz] = useMutation(ELIM_QUIZ, {
        variables: {
            qid: Number.parseInt(quiz.id)
        },
        onError(e) {
            alert(e);
        },
        onCompleted: (e) => {
            navigate('../MyProfile');
        }
    })

    const eliminateQuiz = () => {
        if(window.confirm("Are you sure you wish to delete this quiz?")) {
            return deleteQuiz();
        }
    }




    
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
        <p className="workshop-apology">(This page is buggy... When in doubt refresh the page!)</p>
        <hr className="profile-line"/>

        {/* Once the quiz title and description are set the quiz can be created and the rest of the components may be displayed */}
        {ready &&
        <div>
            <div className="workshop-body-block"  id="questions">
                <QuizTitle title={quiz.title} description={quiz.description} id={quiz.id} refetch={makeRefetch} key="title"/>
                <QuizResult title={quiz.title} results={quiz.endings} refetch={makeRefetch} key="result"/>
                <QuizQuestion title={quiz.title} questions={quiz.questions} refetch={makeRefetch} key="question"/>
                <button className="workshop-delete-button" onClick={()=>{navigate('/MyProfile')}}>Save Progress</button>
                <button className="workshop-delete-button" onClick={eliminateQuiz}>Delete Quiz</button>
            </div>
        </div>
        }
    </div>
    )
}
export default QuizOverview;