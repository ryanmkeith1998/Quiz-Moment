import React, { useEffect, useState } from 'react';
import QuestionCard from './Question-Card';

function QuizQuestion(props) {
    const [Questions, setQuestions] = useState([<QuestionCard title={props.title}/>])


    // useEffect - Loads in all of the Questions associated with the quiz
    // ------------------------------------------------------------------
    useEffect(() => {
        if (props.questions) {
            setQuestions([]);
            (props.questions).map((e) => {
                let newQuestion = <QuestionCard title={props.title} question={e} key={e.id}/>
                setQuestions(oldQuestions => [...oldQuestions, newQuestion]);
            })
        }
    }, [props.questions]);


    // addCard - Helper function to add new Question Cards to the display
    // ------------------------------------------------------------------
    const addCard = () => {
        let newQuestion = <QuestionCard title={props.title}/>
        setQuestions(oldQuestions => [...oldQuestions, newQuestion]);
    }

    return (
        <div>
            <div className="questions-body">
                <p className="questions-title">Questions</p>
                <button 
                    className="quiz-result-plus-button"
                    onClick={addCard}
                >
                    &#43;
                </button>
            </div><br/>
            
            <div className="questions-cards">
                {Questions}
            </div>
            <hr className="profile-line"/>
        </div>   
    );
}
export default QuizQuestion;