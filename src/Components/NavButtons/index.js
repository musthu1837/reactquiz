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
    const { handleNext, handlePrevious, nextDisabled, previousDisabled, handleAnswerChange, handleMarkQuestion} = this.props
    return(
      <div className='nav-container'>
        <div className="button-group1">
          <Button
            onClick = { handlePrevious }
            disabled = { previousDisabled }
            primary
          >
            Previous
          </Button>
          <Button 
            color="grey"
            onClick = {(event) => handleAnswerChange(-1 )}
          >
            Clear Response
          </Button>
        </div>
        <div className="button-group2">
          <Button
            onClick = { handleMarkQuestion } 
            color="purple"
          >
            Mark for review
          </Button>
          <Button
            onClick = { handleNext }
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
