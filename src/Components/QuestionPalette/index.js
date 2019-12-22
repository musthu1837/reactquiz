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
    return(
        <div className="main-container">
          <div className="qp-header">
            Question Palette:
          </div>
          <div className='qp-container'>
          {
            Array.apply(null, Array(200)).map(function(value, index){
              return <Button basic key={index} style={{"radius":"3px","margin": "10px","width": "50px","alignContent": "center"}} >{index}</Button>
            })
          }
          </div>
        </div>
    );
  }
}

export default QuestionPalette;
