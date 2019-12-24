import React, { Component } from 'react';
import {Menu, Grid, Button} from 'semantic-ui-react'
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
      answers: answers,
      minutes: GSlength - 1,
      seconds: 59
    }
  }
  
  handleNext = (event) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: Number(questionIndex) + 1 , answers})
  }

  handlePrevious = (event) => {
    let questionIndex = this.state.questionIndex
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: Number(questionIndex) - 1 , answers})
  }

  handleChangeAnswer = (answeredIndex) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    answers.GS[questionIndex].answeredIndex = answeredIndex
    this.setState({answers: answers})
  }

  handleJumpQuestion = (event) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    let answeredIndex = answers.GS[questionIndex].answeredIndex
    answers.GS[questionIndex].answeredIndex = answeredIndex == null ? -1 : answeredIndex
    this.setState({questionIndex: Number(event.target.value), answers})
  }

  handleMarkQuestion = (event) => {
    let questionIndex = this.state.questionIndex
    let answers = this.state.answers
    answers.GS[questionIndex].mark = (!answers.GS[questionIndex].mark)
    this.setState({answers: answers}) 
  }

  render(){
    return (
      <div className="App">
        <Menu size='huge'>
          <Menu.Item>
            <b>React QUIZ</b>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button color="green">Submit</Button>
            </Menu.Item>            
          </Menu.Menu>
        </Menu>
        <br/>
        <Grid divided>
          <Grid.Column width={11} style = {{"marginLeft": "30px"}}>
            <Grid.Row>
              <Question
                question = {data.GS[this.state.questionIndex]}
                answer = {this.state.answers.GS[this.state.questionIndex]}
                questionIndex = {this.state.questionIndex}
                handleAnswerChange = {this.handleChangeAnswer}
              />
            </Grid.Row>
            <Grid.Row>
              <NavButtons
                handleNext = {this.handleNext}
                handlePrevious = {this.handlePrevious}
                nextDisabled = {this.state.questionIndex === GSlength - 1 }
                previousDisabled = {this.state.questionIndex === 0 }
                handleAnswerChange = {this.handleChangeAnswer} 
                handleMarkQuestion = {this.handleMarkQuestion}
              />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              <Profile
                minutes = {this.state.minutes}
                seconds = {this.state.seconds}
              />
            </Grid.Row>
            <Grid.Row>
              <QuestionPalette
                handleJumpQuestion = { this.handleJumpQuestion }
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
