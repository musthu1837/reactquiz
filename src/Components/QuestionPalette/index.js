import React, { Component } from 'react';
import {Button} from 'semantic-ui-react'
import './question-palette.css';

class QuestionPalette extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    const change = this.props.changeQuestionIndex;
    const totalQuestions = this.props.totalQuestions;
    const answers = this.props.answers;
    return(
        <div className="main-container">
          <div className="qp-header">
            Question Palette:
          </div>
          <div className='qp-container'>
          {
            Array.apply(null, Array(totalQuestions)).map(function(value, index){           
                const answeredIndex = answers.GS[index].answeredIndex
                return ( 
                <Button 
                  value = {index}
                  onClick = {change}
                  key={index} 
                  style={{"radius":"3px","margin": "10px","width": "50px","alignContent": "center"}} 
                  
                  color = { (answeredIndex == null) ? null : (answeredIndex >= 0) ? "green" : "red"}
                >
                  {index + 1}
                </Button>
                )
            })
          }
          </div>
        </div>
    );
  }
}

export default QuestionPalette;
