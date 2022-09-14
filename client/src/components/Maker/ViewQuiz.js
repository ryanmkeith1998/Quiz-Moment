import { useNavigate } from 'react-router-dom';
import { useLocation} from "react-router-dom";
import { AUTH_TOKEN } from '../../constants';
import GearIcon from '../../icons/gear.png';
import React from 'react';

function ViewQuiz() {
    const navigate = useNavigate();
    const quiz = useLocation().state.quiz;


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

                    <div className="feed-result-section">
                        {/* Result Section */}
                        <Results endings={quiz.endings}/>
                    </div>

                    <hr className='profile-line'/>
                    
                    <div className="feed-question-section">
                        {/* Question Section */}
                        <Questions questions={quiz.questions}/>
                    </div>
                </div>
            </div>

            <hr className="profile-line"/>
            <button className="view-quiz-return" onClick={goToProfile}>Back to Profile</button>
        </div>
    )
}

function Results(props) {
    const showCards = props.endings.map((result) => <ResultCard result={result} key={result.id}/>)
    return (
        <div className='workshop-body-block'>
            <div>
                <p className="quiz-result-title">Possible Outcomes</p>
            </div>
            
            <br/>
            
            <div className="quiz-result-cards">
                {showCards}
            </div>
        </div>   
    )
}

function ResultCard({ result }) {
    return (
        <div className="result-card">
            <div>
                <p className="result-card-finished-title">
                    {result.name}
                </p>
                <p className="result-card-finished-content">
                    {result.description}
                </p>
            </div>
        </div>
    )
}

function Questions({ questions }) {
    let index = 1;
    const questionsList = questions.map((question) => 
            <Question question={question} key={question.id} place={index++}/>
        )
    
        return (
            <div>
                {questionsList}
            </div>
        )
}

function Question({ question, place }) {
    const choiceList = question.choices.map((choice) => <li className="que-cho-show-content" key={choice.id}> {choice.content} </li>)

    return (
        <div>
            Question {place}
            <div className="TQ-question-card">
                <div>
                    <div className="TQ-question-content">
                        {question.content}
                        <ul className="questions-card-choices">
                            {choiceList}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}











export default ViewQuiz;