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
    return(
      <div className='qs-container'>
        <div className='qs-number'>
          Question No. {this.props.index + 1}
        </div>
        <div className='qs-header'>
          { question.question }
        </div>
        <div className='qs-options'>
          {
            Array.apply(null, Array(4)).map(function(value, index){
                return(
                  <div key={index}>
                    <Radio label={question.answers[index]} onChange={event => console.log(event.target.value)}/><br/>
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
