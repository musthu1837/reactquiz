import React from 'react';
import {Button} from 'semantic-ui-react'
import './question-palette.css';

const QuestionPalette = (props) => {
  const { handleJumpQuestion, totalQuestions, answers } = props
  return(
      <div className="main-container">
        <div className="qp-header">
          Question Palette:
        </div>
        <div className='qp-container'>
        {
          Array.apply(null, Array(totalQuestions)).map(function(value, index){           
              const answeredIndex = answers.GS[index].answeredIndex
              const mark = answers.GS[index].mark
              return ( 
              <Button 
                value = {index}
                onClick = {handleJumpQuestion}
                key={index} 
                style={{"radius":"3px","margin": "10px","width": "50px","alignContent": "center"}}                   
                color = { (mark) ? "purple":(answeredIndex == null) ? null : (answeredIndex >= 0) ? "green" : "red"}
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
