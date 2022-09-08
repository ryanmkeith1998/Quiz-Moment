import React, { useState } from 'react';
import RyanInput from './testAGrandBaby';

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };

class TemperatureInput extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    

    handleChange(e) {
      this.props.onTemperatureChange(e.target.value);
    }
  
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
    
      
      return (
      
        <fieldset>
            <legend>Enter temperature in {scaleNames[scale]}:</legend>
            <input value={temperature}
                   onChange={this.handleChange} />
        </fieldset>

        
    
      );
    }
  };


class Choice extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e);
        this.props.onMyChange(e.target.value);
    }

    render() {
        const theValue = this.props.temperature

        return (
            <input value={theValue} 
                   onChange={this.handleChange} />
        )
    }
}
export default Choice;