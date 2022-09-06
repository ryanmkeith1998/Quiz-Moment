import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_RESULTS, SUBMIT_CHOICE, CHANGE_CHOICE, ELIM_CHOICE } from '../../Mutations';

function QuestionChoice(props) {
  const [Choice, setChoice] = useState({
      content: '',
      resultName: '',
      value: 0,
      open: false,
      switch: false,
      edit: false,
  });

  const [Results, setResults] = useState([]);
  

  // useEffect - Loads in all previously created Choices for the associated Question
  // -------------------------------------------------------------------------------
  useEffect(() => {
    if(props.choice) {
      setChoice({
        ...Choice,
        content: props.choice.content,
        resultName: props.choice.resultName,
        value: props.choice.value,
        id: props.choice.id,
        switch: true
      })
    }
  }, [props.choice]);


  // grabResults - Retrieves all results associated with the current quiz, to be displayed
  // Helper Functions: getResults
  // -------------------------------------------------------------------------------------
  const [grabResults] = useMutation(GET_RESULTS, {
    variables: {
      title: props.title
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      if (Results.length > 0) {
        setResults([]);
      };
      (e.getResults).map((result) => {
        let newResult = <TheResults result={result.name} onClick={() => {console.log(result.name)}}/>
        setResults(oldResults => [...oldResults, newResult])
      })
    }
  });

  const getResults = () => {
    if (!Choice.open) {
      grabResults();
      setChoice({
        ...Choice,
        open: true
      })
    } else {
      setChoice({
        ...Choice,
        open: false
      })
    }
    
  }

  
  // submitChoice - Sends the input information to the database to become a new Choice
  // Helper Functions: addChoice
  // ---------------------------------------------------------------------------------
  const [submitChoice] = useMutation(SUBMIT_CHOICE, {
    variables: {
      quizTitle: props.title,
      questionContent: props.question,
      content: Choice.content,
      resultName: Choice.resultName,
      value: Choice.value
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      setChoice({
        ...Choice,
        id: e.id,
        switch: true
      })
    }
  })

  const addChoice = () => {
    return submitChoice();
  }


  // changeTheChoice - Alter the information stored in the database for this Choice
  // Helper Functions: editChoice
  // ------------------------------------------------------------------------------
  const [changeTheChoice] = useMutation(CHANGE_CHOICE, {
    variables: {
      quizTitle: props.title,
      content: Choice.content,
      newResult: Choice.resultName,
      value: Number.parseInt(Choice.value),
      cid: Number.parseInt(Choice.id)
    },
    onCompleted: (e) => {
      setChoice({
        ...Choice,
        content: e.content,
        resultName: e.resultName,
        value: Number.parseInt(e.value)
      })
      setChoice({
        ...Choice,
        switch: true,
        edit: false
      })
    }
  });

  const editChoice = () => {
    console.log((Choice.resultName));
    if (Choice.resultName === undefined) {
      alert("please input a result");
      return false;
    }
    return changeTheChoice();
  }


  // deleteChoice - Remove all data stored in the database for this choice
  // Helper Function: eliminateChoice
  // ---------------------------------------------------------------------
  const [deleteChoice] = useMutation(ELIM_CHOICE, {
    variables: {
      cid: Number.parseInt(Choice.id)
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      window.location.reload();
    }
  })

  const eliminateChoice = () => {
    return deleteChoice();
  }


  return (
      <>
        {/* Choice Creation Section */}
        {!Choice.switch &&
          <div>
          <div className="que-cho-grid">
            <button className="que-cho-delete" onClick={eliminateChoice}>X</button>
            <textarea
              className="que-cho-tb"
              maxLength={200}
              value={Choice.content}
              onChange={(e) =>
                setChoice({
                    ...Choice,
                    content: e.target.value
                })
              }
            />
            {!Choice.edit && <button className="que-cho-submit" onClick={addChoice}>&#10004;</button>}
            {Choice.edit && <button className="que-cho-submit" onClick={editChoice}>&#10004;d</button>}
          </div>
          
          <div className="que-cho-body">

            {/* Dropdown Menu Section */}
            <div className="que-cho-dd">
              <label>Result:</label>
              <select onClick={getResults} onChange={(e) => {
                setChoice({
                  ...Choice,
                  resultName: e.target.value
                });
                }
              }
              className="que-cho-ddc">
                <option></option>
                {Results}
              </select>
            </div>
            <div className='que-cho-blurb-wrap'>
              <label className="que-cho-info-blurb">i</label>
              <p className="que-cho-inner-wrap">If you chose a result but it defaulted back to blank, dont worry. It's still there, just ignore it!</p>
            </div>
            
            <label>
              Value
            </label>
            
            <input 
              className="que-cho-val-input"
              value={Choice.value}
              onChange={(e) => {
                if (!(e.target.value)) {
                  e.target.value = 0;
                }
                setChoice({
                    ...Choice,
                    value: parseInt(e.target.value)
                });
              }}
            >
            </input>
          </div>
        </div>
        }
        
        {/* Choice Display Section */}
        {Choice.switch && 
        <div className="que-cho-grid">
          <button className="que-cho-delete" onClick={eliminateChoice}>X</button>
          <div className="que-cho-show-content">
            {Choice.content}
          </div>
          <button onClick={() => {setChoice({...Choice, switch: false, edit: true})}} className="que-cho-edit">&#9998;</button>
        </div>
        }
      </>
  );
}


// TheResults - Helper function to display all the results in a dropdown menu
// --------------------------------------------------------------------------
function TheResults(props) {
  return (
    <option>
      {props.result}
    </option>
  )
}
export default QuestionChoice;