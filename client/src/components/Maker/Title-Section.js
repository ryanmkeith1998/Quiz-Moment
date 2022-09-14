import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CHANGE_TITLE } from '../Mutations';


function QuizTitle(props) {
  const [Title, setTitle] = useState({
    title: props.title,
    description: props.description,
    id: Number.parseInt(props.id),
    edit: false
  })

  // changeQuizTitle - Sends new information relating to the quiz title to the database
  // Helper Functions: newTitle
  // ----------------------------------------------------------------------------------
  const [changeQuizTitle] = useMutation(CHANGE_TITLE, {
    variables: {
      title: Title.title,
      description: Title.description,
      qid: Title.id
    },
    onError(e) {
      alert(e);
    },
    onCompleted: (e) => {
      setTitle({
        ...Title,
        title: e.title,
        description: e.description,
      })
      setTitle({
        ...Title,
        edit: false
      });
    }
  })

  const newTitle = () => {
    return changeQuizTitle();
  }


  return (
    <div>
      {/* Title Display Section */}
      {!Title.edit && 
      <div>
        <p className="quiz-title-title">{Title.title}</p> 
        <p className="quiz-title-description">{Title.description}</p>
        <button onClick={() => {
                  setTitle({...Title, edit: true});
                }} 
                className="quiz-edit-button"
        >
          Edit &#9998;
        </button>
      </div>
      }

      {/* Edit Title information Section */}
      {Title.edit &&
      <div>
        <div>
          <input  
                value={Title.title} 
                onChange={(e) =>
                  setTitle({
                    ...Title,
                    title: e.target.value
                  })
                }
                className="workshop-input-title" 
                type="text" 
                placeholder="Sample Quiz Title" 
                maxLength="64"
          />
          <div>
            <textarea  
              value={Title.description} 
              onChange={(e) =>
                setTitle({
                  ...Title,
                  description: e.target.value
                })
              }
              className="workshop-input-content" 
              type="text"
              placeholder='Sample Quiz Description...'
              maxLength="500"
            /><br/>
          </div>
          <button onClick={newTitle} className="workshop-button-confirm">Submit</button>
        </div>
      </div>
      }
      <hr className="profile-line"/>
    </div>
  );
}
export default QuizTitle;