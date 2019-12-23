import React, { Component } from 'react';
import {Button} from 'semantic-ui-react'
import './question-palette.css';

class QuestionPalette extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  selectColor = (index) => {
    const answers = this.props.answers;
    if ( answers[index].answeredIndex == -1 )
      return "red"
    else if  ( answers[index].answeredIndex == null ){
      return "none"
    }
    else
      return "green"
  }
  render(){
    const change = this.props.changeQuestionIndex;
    const totalQuestions = this.props.totalQuestions;
    return(
        <div className="main-container">
          <div className="qp-header">
            Question Palette:
          </div>
          <div className='qp-container'>
          {
            Array.apply(null, Array(totalQuestions)).map(function(value, index){           
                return ( 
                <Button 
                  value = {index}
                  onClick = {change}
                  key={index} 
                  style={{"radius":"3px","margin": "10px","width": "50px","alignContent": "center"}} 
                  basic
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
