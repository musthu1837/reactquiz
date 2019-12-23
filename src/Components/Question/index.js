import React, { Component } from 'react';
import {Radio} from 'semantic-ui-react'
import './question.css';

class Question extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    const question = this.props.question
    const questionIndex = this.props.index
    const options = question.answers
    const answer = this.props.answer
    const handleAnswerChange = this.props.handleAnswerChange
    return(
      <div className='qs-container'>
        <div className='qs-number'>
          Question No. { questionIndex + 1}
        </div>
        <div className='qs-header'>
          { question.question }
        </div>
        <div className='qs-options'>
          {
            Array.apply(null, Array(4)).map(function(value, index){
                return(
                  <div key={index}>
                    <Radio 
                      checked = { index === answer.answeredIndex }
                      value = { index }
                      label = {question.answers[index]} 
                      onChange = {(e, { name, value}) => handleAnswerChange(questionIndex, index)}
                    />
                    <br/>
                  </div>
                )
              })
          }
        </div>
      </div>
    );
  }
}

export default Question;
