import React, { Component } from 'react';
import {Button} from 'semantic-ui-react'
import './navbuttons.css';

class NavButtons extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    const Next = this.props.nextQuestion;
    const Previous = this.props.previousQuestion;
    const nextDisabled = this.props.nextDisabled;
    const previousDisabled = this.props.previousDisabled;
    const handleAnswerChange = this.props.handleAnswerChange;
    const questionIndex = this.props.index;
    return(
      <div className='nav-container'>
        <div className="button-group1">
          <Button
            onClick = { (event) => Previous(questionIndex) }
            disabled = { previousDisabled }
            primary
          >
            Previous
          </Button>
          <Button 
            color="grey"
            onClick = {(event) => handleAnswerChange(questionIndex, -1 )}
          >
            Clear Response
          </Button>
        </div>
        <div className="button-group2">
          <Button color="purple">Mark for review & Next</Button>
          <Button
            //onClick = { Next }
            onClick = { (event) => Next(questionIndex) }
            disabled = { nextDisabled } 
            primary
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default NavButtons;
