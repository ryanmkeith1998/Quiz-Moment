import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import QuestionChoice from './Question-Choice';
import { QUESTION_CREATION, CHANGE_QUESTION, ELIM_QUESTION } from '../../Mutations';

function QuestionCard(props) {
  const [Question, setQuestion] = useState({
    content: '',
    finished: false,
    choices: [],
    id: null,
    edit: false
  })

  const [Choices, setChoices] = useState([])


  // useEffect - Loads in previously created Question Cards to be displayed
  // ----------------------------------------------------------------------
  useEffect(() => {
    if(props.question) {
      setChoices([]);
      (props.question.choices).map((e) => {
        let newChoice = <QuestionChoice title={props.title} question={props.question.content} choice={e} key={e.id}/>
        setChoices(oldChoices => [...oldChoices, newChoice]);
      })
      setQuestion({
        ...Question,
        content: props.question.content,
        id: Number.parseInt(props.question.id),
        finished: true
      })
    }
  }, [props.question]);


  // addChoice - Helper function that adds a new Choice to the list being displayed on this card
  // -------------------------------------------------------------------------------------------
  function addChoice() {
      let newChoice = <QuestionChoice title={props.title} question={Question.content}/>
      setChoices(oldChoices => [...oldChoices, newChoice]);
  }


  // addQuestion - Adds a new question to the database using the input information
  // Helper Functions: processQuestion
  // -----------------------------------------------------------------------------
  const [addQuestion] = useMutation(QUESTION_CREATION, {
    variables: {
      content: Question.content,
      quizTitle: props.title
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      setQuestion({
        ...Question,
        id: Number.parseInt(e.id),
        finished: true
      });
      addChoice();
      addChoice();
    }
  });

  const processQuestion = () => {
    return addQuestion();
  }


  // changeTheQuestion - Alters the information stored in the database for this question
  // Helper Function: editQuestion
  // -----------------------------------------------------------------------------------
  const [changeTheQuestion] = useMutation(CHANGE_QUESTION, {
    variables: {
      qid: Number.parseInt(Question.id),
      content: Question.content
    },
    onCompleted: (e) => {
      setQuestion({
        ...Question,
        content: e.content
      })
      setQuestion({
        ...Question,
        finished: true,
        edit: false
      })
    }
  })

  const editQuestion = () => {
    return changeTheQuestion();
  }


  // deleteQuestion - Removes the question from the database and reloads the page to stop displaying it
  // Helper Functions: eliminateQuestion
  // --------------------------------------------------------------------------------------------------
  const [deleteQuestion] = useMutation(ELIM_QUESTION, {
    variables: {
      qid: Number.parseInt(Question.id)
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      window.location.reload();
    }
  })

  const eliminateQuestion = () => {
    return deleteQuestion();
  }


  return (
    <div className="result-card">
      <div className="result-card-x" onClick={eliminateQuestion}>X</div>

        {/* Question Input Section */}
        {!Question.finished && 
        <div>
            <div>
                <textarea  
                    value={Question.content} 
                    onChange={(e) =>
                    setQuestion({
                        ...Question,
                        content: e.target.value
                        })
                    }
                    className="result-card-content" 
                    type="text"
                    placeholder='Sample Question Description...'
                    maxLength={500}
                /><br/>
            </div>
              
            {/* Only one button shows at a time, one for creation and one for editing the question */}
            {!Question.edit && <button className="result-card-submit" onClick={processQuestion}> Submit </button>}
            {Question.edit && <button className="result-card-submit" onClick={editQuestion}> Submit </button>}
        </div>
        }

        {/* Question Display Section */}
        {Question.finished && 
        <div>
          <div className="result-card-finished-content">
            {Question.content}
            <button 
              className="question-card-plus-button"
              onClick={addChoice}
            >
              &#43;
            </button>
            <div> 
              <button className="question-card-edit" onClick={() => {
                setQuestion({...Question, finished: false, edit: true})
              }}>Edit Question Title &#9998;</button>
            </div>
            <div className="questions-card-choices">
                {Choices}
            </div> 
          </div>
        </div>
        }
    </div>
  );
}
export default QuestionCard;