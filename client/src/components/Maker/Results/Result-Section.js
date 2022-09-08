import React, { useEffect, useState } from 'react';
import ResultCard from './Result-Card';

function QuizResult(props) {
    const [results, setResults] = useState([]);
    const [ready, setReady] = useState(false);


    // useEffect - Loads in any previously created Results from the quiz
    // -----------------------------------------------------------------
    useEffect(() => {
        setResults([]);
        if(props.results) {
            (props.results).map((e) => {
                let newCard = <ResultCard result={e} key={e.id} refetch={props.refetch} tag="useful"/>
                setResults(oldResults => [...oldResults, newCard]);
            })
            if (props.results.length < 2) {
                let newCard = <ResultCard title={props.title} tag="useful" refetch={props.refetch} key="1"/>
                setResults(oldResults => [...oldResults, newCard]);
            }
            
            if (props.results.length === 0) {
                let newCard = <ResultCard title={props.title} tag="useful" refetch={props.refetch} key="0"/>
                setResults(oldResults => [...oldResults, newCard]);
            }
        }
        setReady(true);
    }, []);


    // addCard - Helper Function that adds all Result cards to a list to be displayed
    // ------------------------------------------------------------------------------
    const addCard = () => {
        let newResult = <ResultCard title={props.title} key={props.title} refetch={props.refetch} tag="garbage"/>
        setResults(oldResults => [...oldResults, newResult]);
    }

    return (
        <div>
            {ready &&
                <div>
                    <div className="quiz-result-body">
                        <p className="quiz-result-title">Possible Outcomes</p>
                        <button 
                            className="quiz-result-plus-button"
                            onClick={addCard}
                        >
                            &#43;
                        </button>
                    </div><br/>
                    
                    <div className="quiz-result-cards">
                        {results}
                    </div>
                    <hr className="profile-line"/>
                </div>   
            }
        </div>
        
    );
}
export default QuizResult;