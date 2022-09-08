import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { RESULT_CREATION, CHANGE_RESULT, ELIM_RESULT } from '../../Mutations';

function ResultCard(props) {
  const [Result, setResult] = useState({
    name: '',
    description: '',
    finished: false,
    id: null,
    edit: false,
  })


  // useEffect - Loads in Result information if previously created
  // -------------------------------------------------------------
  useEffect(() => {
    if (props.result) {
      setResult({
        name: props.result.name,
        description: props.result.description,
        id: Number.parseInt(props.result.id),
        finished: true,
      })
    }
  }, [props.result]);


  // addResult - Sends input information to database
  // Helper Functions: processResult
  // -----------------------------------------------
  const [addResult] = useMutation(RESULT_CREATION, {
    variables: {
      name: Result.name,
      description: Result.description,
      quizTitle: props.title
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      setResult({
        ...Result,
        id: Number.parseInt(e.addResult.id),
        finished: true,
      })
    }
  });

  const processResult = () => {
    if (Result.name === '') {
      alert("Please input a name for the result")
      return false;
    }
    return addResult();
  }


  // changeTheResult - Alters the information stored in the database for this Result
  // Helper Functions: editResult
  // -------------------------------------------------------------------------------
  const [changeTheResult] = useMutation(CHANGE_RESULT, {
    variables: {
      name: Result.name,
      description: Result.description,
      rid: Result.id
    },
    onCompleted: (e) => {
      setResult({
        ...Result,
        name: e.name,
        description: e.description
      })
      setResult({
        ...Result,
        finished: true,
        edit: false
      });
    }
  })

  const editResult = () => {
    return changeTheResult();
  }


  // deleteResult - Removes any stored information from the database for this Result
  // Helper Functions: eliminateResult
  // -------------------------------------------------------------------------------
  const [deleteResult] = useMutation(ELIM_RESULT, {
    variables: {
      rid: Number.parseInt(Result.id)
    },
    onError(e) {
      alert(e);
    },
    onCompleted(e) {
      window.location.reload();
    }
  })

  const eliminateResult = () => {
    console.log("here is the id: ", Number.parseInt(Result.id));
    return deleteResult();
  }


  return (
    <div className="result-card">
      <div className="result-card-x" onClick={eliminateResult}>X</div>
        {/* Result Creation Section */}
        {!Result.finished && 
        <div>
          <input  
            value={Result.name}
            onChange={(e) => 
                setResult({
                ...Result,
                name: e.target.value
                })
            }
            className="result-card-title" 
            type="text" 
            placeholder="Outcome Name"
            minLength={1}
            maxLength={32}
          />

          <div>
              <textarea  
                  value={Result.description} 
                  onChange={(e) =>
                  setResult({
                      ...Result,
                      description: e.target.value
                  })
                  }
                  className="result-card-content" 
                  type="text"
                  placeholder='Sample Outcome Description...'
                  maxLength={300}
              /><br/>
          </div>    

          {/* Only one button shows at a time, one for creation and one for editing the result */}   
          {!Result.edit && <button className="result-card-submit" onClick={processResult}> Submit </button>}
          {Result.edit && <button className="result-card-edit" onClick={editResult}>Submit</button>}
          
        </div>
        }

        {/* Result Display Section */}
        {Result.finished && 
        <div>
          <p className="result-card-finished-title">
            {Result.name}
          </p>
          <p className="result-card-finished-content">
            {Result.description}
          </p>
          <button className="result-card-edit" onClick={() => {setResult({...Result, finished: false, edit: true})}}> Edit &#9998; </button>
        </div>
        }
    </div>
  );
}
export default ResultCard;