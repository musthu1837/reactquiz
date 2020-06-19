import React from 'react';
import {Button} from 'semantic-ui-react'
import './question-palette.css';

const QuestionPalette = (props) => {
  const { handleJumpQuestion, totalQuestions, questions } = props
  return(
      <div className="main-container">
        <div className="qp-header">
          Question Palette:
        </div>
        <div className='qp-container'>
        {
          Array.apply(null, Array(totalQuestions)).map(function(value, index){           
              const answeredIndex = questions[index].answeredIndex
              const mark = questions[index].marked
              debugger
              return ( 
              <Button 
                value = {index}
                onClick = {handleJumpQuestion}
                key={index} 
                style={{"radius":"3px","margin": "10px","width": "50px","alignContent": "center"}}                   
                color = { (mark) ? "purple":(answeredIndex === undefined) ? null : (answeredIndex >= 0) ? "green" : "red"}
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

export default QuestionPalette;
