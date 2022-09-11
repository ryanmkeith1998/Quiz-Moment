import React from "react";

class Question extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {id: ''};
    }

    handleClick(result, value, id) {
        if (this.state.id === '') {
            (document.getElementById(id)).style.backgroundColor = '#ee4e34';
            this.props.addAnswer([id, result, value]);
            this.setState({id});
        } else if (id !== this.state.id) {
            (document.getElementById(this.state.id)).style.backgroundColor = '#262626';
            (document.getElementById(id)).style.backgroundColor = '#ee4e34';
            this.props.changeAnswer(this.state.id, [id, result, value]);
            this.setState({id});
        }
    }

    render() {
        const content = this.props.question.content;
        const choices = this.props.question.choices;
        const choiceList = choices.map((choice) => 
            <li className="que-cho-show-content" 
                key={choice.id} 
                id={choice.id} 
                onClick={() => {this.handleClick(choice.result, choice.value, choice.id)}}>
                    {choice.content} </li>
        )

        return (
            <div>
                Question {this.props.place}
                <div className="TQ-question-card">
                    <div>
                        <div className="TQ-question-content">
                            {content}
                            <ul className="questions-card-choices">
                                {choiceList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default Question;