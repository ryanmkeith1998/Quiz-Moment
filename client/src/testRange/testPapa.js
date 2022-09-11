
import React, { useState } from 'react';
import TemperatureInput from './testBaby';
import Choice from './testBaby';


function TestPapa() {
    return (<QuestionCard />);
}



class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }
  
    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }
  
    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }
  
    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
  
        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}


  function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
  function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  function BoilingVerdict(props) {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
  }







class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: '', scale: 'c'};
        this.handleMyChange = this.handleMyChange.bind(this);
    }

    
    handleMyChange(temperature) {
        this.setState({temperature, scale: 'f'});
    }


    render() {
        const theValue = this.state.temperature;
        
        return (
            <div className="full-page">
                <button onClick={() => {console.log(theValue)}}>click me</button>
                <div className="TQ-question-card">
                    {/* Question Display Section */}
                    <div>
                        <div className="TQ-question-content">
                            {/* {Question.content} */}
                            <div className="questions-card-choices">
                                <Choice value={theValue} onMyChange={this.handleMyChange}/>
                                <MyVerdict value={theValue}/>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function MyVerdict(props) {
    console.log("hello", props.value);
    if ((props.value % 2) === 0) {
        return <p>The value is even.</p>;
    }
    return <p>The value is odd.</p>;
}

export default TestPapa;

// const [Question, setQuestion] = useState({
        //     content: '',
        //     finished: false,
        //     choices: [],
        //     id: null,
        //     edit: false
        // })    