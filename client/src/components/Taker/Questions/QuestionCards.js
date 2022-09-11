import React from "react";
import Question from './Question';

class QuestionCards extends React.Component {
    constructor(props) {
        super(props);
        this.addAnswer = this.addAnswer.bind(this);
        this.changeAnswer = this.changeAnswer.bind(this);
        this.state = {Id: ''};
    }

    addAnswer(newItem) {
        this.props.addAnswer(newItem);
    }

    changeAnswer(oldItem, newItem) {
        this.props.changeAnswer(oldItem, newItem);
    }

    

    render() {
        const questions = this.props.questions
        let count = 1;
        const questionsList = questions.map((question) => 
            <Question question={question} addAnswer={this.addAnswer} changeAnswer={this.changeAnswer} place={count++} key={question.id}/>
        )
    
        return (
            <div>
                {questionsList}
            </div>
        )
    }
}
export default QuestionCards;