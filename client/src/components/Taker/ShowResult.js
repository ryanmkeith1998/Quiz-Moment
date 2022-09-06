import { useNavigate, NavLink, useLocation, Routes, Route } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../../constants';
import GearIcon from '../../icons/gear.png';
import React, { useState, useEffect } from 'react';
import Feed from '../Feed';
import { SUBMIT_TAKEN, SUBMIT_OTHERS } from '../Mutations';

function ShowResult(props) {
    const navigate = useNavigate();

    const list = useLocation().state.theList;
    const quiz = useLocation().state.theQuiz;
    const isTaken = useLocation().state.taken;

    const [result, setResult] = useState([]);
    const [ready, setReady]=  useState(false);

    const resultTotals = (quiz.endings).map((result) => [result.name, 0, 0, 0, result.description])

    const [addTaken] = useMutation(SUBMIT_TAKEN);
    const [addOthers] = useMutation(SUBMIT_OTHERS);

    // useEffect - Adds up the highest possible point total for every seperate result
    // ------------------------------------------------------------------------------
    useEffect(() => {
        // Calculate which result had the highest proportional score
        (quiz.questions).map(question => {
            question.choices.map(choice => {
                for (let i = 0; i < (resultTotals).length; i++) {
                    if (resultTotals[i][0] === choice.result.name) {
                        if (choice.value > resultTotals[i][2]) {
                            resultTotals[i][1] -= resultTotals[i][2];
                            resultTotals[i][1] += choice.value;
                            resultTotals[i][2] = choice.value;
                        }
                    }
                }
            })
            for (let i = 0; i < (resultTotals).length; i++) {
                resultTotals[i][2] = 0;
            }
        })

        // Calculate total percentage here and now since JS apparently cannot handle an array of any kind unless its in some kind of state
        list.map(item => {
            for (let i = 0; i < (resultTotals).length; i++) {
                if (item[1].name === resultTotals[i][0]) {
                    resultTotals[i][2] += item[2];
                }
            }
        })


        // Round all the result scores to look nice
        for (let i = 0; i < (resultTotals).length; i++) {
            resultTotals[i][3] = Math.round(100*(100*(resultTotals[i][2] / resultTotals[i][1]))) / 100;
        }

        //Order the results by highest score to lowest score
        resultTotals.sort(function(a, b){return b[3] - a[3]});

        setResult([]);
        resultTotals.map(result => {
            let newResult = <ResultBar score={result[3]} id={result[0]} description={result[4]} key={result[0]}/>;
            setResult(oldResults => [...oldResults, newResult]);
        })
        

        //Check if user has taken quiz before. If so, add Taken to database, if not add Other to database
        if (!isTaken) {
            addTaken({
                variables: {
                    quizId: Number.parseInt(quiz.id),
                    quizName: quiz.title,
                    name: resultTotals[0][0],
                    description: resultTotals[0][4],
                    score: Number.parseInt(resultTotals[0][3])
                }
            });
        } else {
            addOthers({
                variables: {
                    quizId: Number.parseInt(quiz.id),
                    quizName: quiz.title,
                    name: resultTotals[0][0],
                    description: resultTotals[0][4],
                    score: Number.parseInt(resultTotals[0][3])
                }
            });
        }
        setReady(true);
    }, [quiz]);


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
        <>
            <Routes>
                <Route exact path="/Feed" element={<Feed/>}></Route>
            </Routes>

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

                {ready &&
                <div className="workshop-body-block">
                    <p className="show-result-outcome-subtitle">You Got:</p>
                    <p className="show-result-outcome-title">{result[0].props.id}</p>
                    <p className="show-result-outcome-description">{result[0].props.description}</p>

                    <hr className="profile-line"/>
                    <p className="show-result-outcome-subtitle buffer">All your scores:</p>
                    {result}
                    <NavLink className="show-result-return" to="/Feed" >Back to Feed</NavLink>
                </div>
                }
            </div>
        </>
    );
}


function ResultBar(props) {
    const barStyle = {
        width: `${props.score}%`
    }
    return (
        <div className="show-result-score-title">
            {props.id}
            <div className="show-result-score">
                <div style={barStyle} className="show-result-score-bar">
                    {props.score}%
                </div>
            </div><br/>
        </div>
    )
}
export default ShowResult;