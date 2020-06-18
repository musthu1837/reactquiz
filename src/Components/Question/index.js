import React from 'react';
import {Radio} from 'semantic-ui-react'
import './question.css';

const Question = (props) => {
  const { question, questionIndex, answer, handleAnswerChange } = props
  return(
    <div className='qs-container'>
      <div className='qs-number'>
        Question No. { questionIndex + 1}
        <span style={{float: "right"}}>{question.marks} Mark(s)</span>
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
                    onChange = {(e, { name, value}) => handleAnswerChange(Number(value))}
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

export default Question;
