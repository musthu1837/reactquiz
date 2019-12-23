import React, { Component } from 'react';
import {Menu, Grid} from 'semantic-ui-react'
import './App.css';
import Question from './Components/Question'
import NavButtons from './Components/NavButtons'
import Legend from './Components/Legend'
import QuestionPalette from './Components/QuestionPalette'
import Profile from './Components/Profile'
import data from './data.json'
import answers from './answers.json'
const GSlength = data.GS.length
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionIndex: 0,
    }
  }
  
  handleNext = (event) => {
    this.setState({questionIndex: this.state.questionIndex + 1})
  }

  handlePrevious = (event) => {
    this.setState({questionIndex: this.state.questionIndex - 1})
  }
  render(){
    return (
      <div className="App">
        <Menu size='massive'>
          <Menu.Item
            name='React QUIZ'
          />
        </Menu>
        <br/><br/>
        <Grid divided>
          <Grid.Column width={11} style = {{"marginLeft": "30px"}}>
            <Grid.Row>
              <Question
                question={data.GS[this.state.questionIndex]}
                index={this.state.questionIndex}
              />
            </Grid.Row>
            <Grid.Row>
              <NavButtons
                nextQuestion={this.handleNext}
                previousQuestion={this.handlePrevious}
                nextDisabled = {this.state.questionIndex === GSlength - 1 }
                previousDisabled = {this.state.questionIndex === 0 }
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              <Profile/>
            </Grid.Row>
            <Grid.Row>
              <QuestionPalette
                changeQuestionIndex = { (event) => this.setState({questionIndex: Number(event.target.value)})}
                totalQuestions = { GSlength }
                answers = {answers}
              />
            </Grid.Row>
            <Grid.Row>
              <Legend/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
